# US1 Regression Case: Forbidden Implementation Terms

## Purpose

Verify generated spec output stays What/Why oriented and does not include implementation technology terms.

## Forbidden Term Set

- `database`
- `API`
- `REST`
- `endpoint`
- `Redis`
- `MySQL`
- `React`
- `Vue`
- `Java`
- `Python`

## Steps

1. Run:

```bash
.specify/scripts/bash/validate-spec-output.sh specs/001-functional-spec-standard/spec.md
```

2. If needed, run direct scan:

```bash
grep -Ein "\\b(database|API|REST|endpoint|Redis|MySQL|React|Vue|Java|Python)\\b" specs/001-functional-spec-standard/spec.md
```

## Expected Result

- Validator exits with code `0`
- Direct scan returns no matched lines
