#!/usr/bin/env bash

set -euo pipefail

SPEC_FILE="${1:-}"

usage() {
    cat << 'EOF'
Usage: validate-spec-output.sh <spec.md>

Validates structural completeness and key numbering rules for generated spec outputs.
EOF
}

if [[ -z "$SPEC_FILE" ]] || [[ "$SPEC_FILE" == "--help" ]] || [[ "$SPEC_FILE" == "-h" ]]; then
    usage
    [[ -z "$SPEC_FILE" ]] && exit 1 || exit 0
fi

if [[ ! -f "$SPEC_FILE" ]]; then
    echo "ERROR: spec file not found: $SPEC_FILE" >&2
    exit 1
fi

required_patterns=(
    '^# Feature Specification:'
    '^## User Scenarios & Testing'
    '^## Requirements'
    '^### Functional Requirements'
    '^### Quality and Verification Requirements'
    '^### Key Entities'
    '^## Success Criteria'
    '^## Assumptions'
)

for pattern in "${required_patterns[@]}"; do
    if ! grep -Eq "$pattern" "$SPEC_FILE"; then
        echo "ERROR: Missing required section pattern: $pattern" >&2
        exit 1
    fi
done

if ! grep -Eq '\(Priority:[[:space:]]*P1\)' "$SPEC_FILE"; then
    echo "ERROR: Missing P1 user story" >&2
    exit 1
fi

fr_lines=$(grep -Eo '\*\*FR-[0-9]{3}\*\*' "$SPEC_FILE" || true)
if [[ -z "$fr_lines" ]]; then
    echo "ERROR: No FR entries found" >&2
    exit 1
fi

# Validate FR IDs are sequential and start from FR-001.
fr_ids=$(echo "$fr_lines" | sed -E 's/\*\*FR-([0-9]{3})\*\*/\1/')
expected=1
while IFS= read -r id; do
    [[ -z "$id" ]] && continue
    id_num=$((10#$id))
    if [[ "$id_num" -ne "$expected" ]]; then
        echo "ERROR: FR sequence broken. Expected FR-$(printf '%03d' "$expected"), got FR-$id" >&2
        exit 1
    fi
    expected=$((expected + 1))
done <<< "$fr_ids"

# Require at least one non-happy-path acceptance scenario marker.
if ! grep -Eiq 'Failure|EdgeCase|异常|失败|边界' "$SPEC_FILE"; then
    echo "ERROR: Non-happy-path acceptance scenario marker not found" >&2
    exit 1
fi

# Forbid implementation detail terms in output.
if grep -Eiq '\b(database|API|REST|endpoint|Redis|MySQL|React|Vue|Java|Python)\b' "$SPEC_FILE"; then
    echo "ERROR: Forbidden implementation terms found in spec output" >&2
    exit 1
fi

# Ensure success criteria are measurable.
if grep -E '^- \*\*SC-[0-9]{3}\*\*:' "$SPEC_FILE" | grep -Eiv '[0-9]+|%|ms|s|分钟|小时|天|次|人|k|m' >/dev/null; then
    echo "ERROR: Some success criteria appear non-measurable" >&2
    exit 1
fi

echo "PASS: spec output validation passed"
