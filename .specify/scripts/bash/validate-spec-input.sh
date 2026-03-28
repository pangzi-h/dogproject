#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(CDPATH="" cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"

SCHEMA_PATH=""
BRIEF_PATH=""

usage() {
    cat << 'EOF'
Usage: validate-spec-input.sh [--schema <path>] [--brief <path>]

Options:
  --schema <path>   Path to spec input schema yaml. Defaults to current feature contracts/spec-input-schema.yaml
  --brief <path>    Optional feature brief yaml to validate against schema gates
  --help, -h        Show help
EOF
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        --schema)
            SCHEMA_PATH="${2:-}"
            shift 2
            ;;
        --brief)
            BRIEF_PATH="${2:-}"
            shift 2
            ;;
        --help|-h)
            usage
            exit 0
            ;;
        *)
            echo "ERROR: Unknown option: $1" >&2
            usage
            exit 1
            ;;
    esac
done

if [[ -z "$SCHEMA_PATH" ]]; then
    _paths_output=$(get_feature_paths) || { echo "ERROR: Failed to resolve feature paths" >&2; exit 1; }
    eval "$_paths_output"
    unset _paths_output
    SCHEMA_PATH="$CONTRACTS_DIR/spec-input-schema.yaml"
fi

if [[ ! -f "$SCHEMA_PATH" ]]; then
    echo "ERROR: spec input schema not found: $SCHEMA_PATH" >&2
    exit 1
fi

required_keys=(
    'version:'
    'schema:'
    'required:'
    'gap_detection:'
    'validation_gates:'
)

for key in "${required_keys[@]}"; do
    if ! grep -q "^[[:space:]]*${key}" "$SCHEMA_PATH"; then
        echo "ERROR: Missing required schema key '${key}' in $SCHEMA_PATH" >&2
        exit 1
    fi
done

for field in id projectName background targetUsers coreFlows businessGoal; do
    if ! grep -q "^[[:space:]]*-[[:space:]]*${field}$" "$SCHEMA_PATH"; then
        echo "ERROR: Missing required field '${field}' in schema required list" >&2
        exit 1
    fi
done

# Optional brief validation to enforce gate intent.
if [[ -n "$BRIEF_PATH" ]]; then
    if [[ ! -f "$BRIEF_PATH" ]]; then
        echo "ERROR: brief file not found: $BRIEF_PATH" >&2
        exit 1
    fi

    for field in id projectName background businessGoal; do
        if ! grep -q "^[[:space:]]*${field}:[[:space:]]*[^[:space:]].*$" "$BRIEF_PATH"; then
            echo "ERROR: Missing or empty scalar field in brief: ${field}" >&2
            exit 1
        fi
    done

    if ! grep -q "^[[:space:]]*targetUsers:[[:space:]]*$" "$BRIEF_PATH"; then
        echo "ERROR: Missing targetUsers array in brief" >&2
        exit 1
    fi

    if ! grep -q "^[[:space:]]*coreFlows:[[:space:]]*$" "$BRIEF_PATH"; then
        echo "ERROR: Missing coreFlows array in brief" >&2
        exit 1
    fi

    # Guardrail for implementation terms (aligned with schema validation_gates.no_impl_language)
    if grep -Eiq '\b(Java|Python|MySQL|Redis|API|REST|HTTP|endpoint)\b' "$BRIEF_PATH"; then
        echo "ERROR: brief contains implementation language/protocol terms forbidden by no_impl_language gate" >&2
        exit 1
    fi

    # Ensure quantified business goal.
    if ! grep -Eiq 'businessGoal:[[:space:]]*.*([0-9]+|[0-9]+%)' "$BRIEF_PATH"; then
        echo "WARNING: businessGoal appears non-quantified (quantified_goal gate)" >&2
    fi
fi

echo "PASS: spec input contract validation passed"
