---
agent: speckit.specify
---

# speckit.specify Prompt Contract

## Minimal Input Mapping Rules (US1)

When user input contains mixed natural language, map fields in this order:

1. `projectName`: feature or project title
2. `background`: business context and motivation
3. `targetUsers`: explicit user roles
4. `coreFlows`: business journey statements
5. `businessGoal`: measurable target (number, ratio, or time)

If any required field is missing, produce draft output and mark missing items as GapItem / `NEEDS CLARIFICATION`.

## Output Rules

- Output must follow fixed section anchors in `.specify/templates/spec-template.md`
- Keep content What/Why oriented
- Do not include implementation terms: `database`, `API`, `REST`, `endpoint`, `Redis`, `MySQL`, `React`, `Vue`, `Java`, `Python`
- User stories must include priority, independent test, and Given-When-Then scenarios

## Completion Conditions

A generated spec is considered acceptable for US1 when:

- At least one `Priority: P1` user story exists
- Required sections are complete
- No forbidden implementation terms appear in core requirement sections
