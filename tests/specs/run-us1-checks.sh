#!/usr/bin/env bash

set -euo pipefail

SPEC_FILE="specs/001-functional-spec-standard/spec.md"
VALIDATOR=".specify/scripts/bash/validate-spec-output.sh"

if [[ ! -f "$SPEC_FILE" ]]; then
    echo "ERROR: Missing spec file: $SPEC_FILE" >&2
    exit 1
fi

if [[ ! -x "$VALIDATOR" ]]; then
    echo "ERROR: Missing or non-executable validator: $VALIDATOR" >&2
    exit 1
fi

echo "[US1] Running structure and forbidden-term checks..."
"$VALIDATOR" "$SPEC_FILE"

echo "[US1] Checking minimal section markers..."
for marker in \
    "^## User Scenarios & Testing" \
    "^## Requirements" \
    "^## Success Criteria" \
    "^## Assumptions"; do
    if ! grep -Eq "$marker" "$SPEC_FILE"; then
        echo "ERROR: Missing marker: $marker" >&2
        exit 1
    fi
done

echo "[US1] Summary"
echo "- Structure validation: PASS"
echo "- Forbidden implementation terms: PASS"
echo "- US1 independent test: PASS"
