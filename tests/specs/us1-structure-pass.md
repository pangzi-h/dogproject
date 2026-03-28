# US1 Regression Case: Seven-Section Structure Pass

## Purpose

Verify generated spec output contains the required fixed sections and can pass structural validation.

## Preconditions

- Target spec file exists at `specs/001-functional-spec-standard/spec.md`
- Output validator exists at `.specify/scripts/bash/validate-spec-output.sh`

## Steps

1. Run:

```bash
.specify/scripts/bash/validate-spec-output.sh specs/001-functional-spec-standard/spec.md
```

2. Confirm command exits with code `0`

## Expected Result

- Output contains `PASS: spec output validation passed`
- The spec includes all mandatory sections in fixed order
- At least one `Priority: P1` user story exists
