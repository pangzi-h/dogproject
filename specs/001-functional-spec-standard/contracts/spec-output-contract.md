# Spec Output Contract

**Contract Version**: 1.0.0  
**Feature**: `001-functional-spec-standard`  
**Date**: 2026-03-25  
**Consumer**: Product Agent, Frontend Agent, Backend Agent, Test Agent, speckit.plan command

---

## Purpose

This contract defines the required structure and field constraints for a completed functional specification document (`spec.md`). Any agent or tool that consumes a spec.md must expect and validate against this contract. Any agent that produces a spec.md must conform to it.

---

## Section Schema

A conforming spec.md MUST contain all seven sections in the following order:

```
1. Feature Header (metadata block)
2. User Scenarios & Testing
3. Requirements
   3a. Functional Requirements
   3b. Quality and Verification Requirements
   3c. Key Entities
4. Success Criteria
5. Assumptions
```

Missing any of sections 1–5 constitutes a QR-001 violation.

---

## Section 1: Feature Header

**Required Fields** (YAML-like front matter or Markdown bold pairs):

| Field | Format | Example |
|-------|--------|---------|
| `# Feature Specification:` | `# Feature Specification: {name}` | `# Feature Specification: 前后端功能规范标准化` |
| `Feature Branch` | `\`{branch}\`` | `\`001-functional-spec-standard\`` |
| `Created` | `YYYY-MM-DD` | `2026-03-25` |
| `Status` | One of: `Draft` \| `In Review` \| `Approved` \| `Superseded` | `Draft` |

**Constraints**:
- Title and branch must match (branch = kebab-case of title or short-name).
- Status must not remain `Draft` after Approved review sign-off.

---

## Section 2: User Scenarios & Testing

**Required**: At least 1 User Story with `Priority: P1`.

Each User Story block MUST contain:

| Element | Constraint |
|---------|------------|
| Story title | Non-empty string |
| `Priority` | `P1` \| `P2` \| `P3` |
| Story narrative ("作为…我希望…以便…") | All three clauses present |
| `Why this priority` | Non-empty; must explain dependency or business risk |
| `Independent Test` | Describes a self-contained validation scenario |
| `Acceptance Scenarios` | Minimum: 1 success scenario + 1 non-happy-path scenario |

Each Acceptance Scenario MUST use Given-When-Then format:
- **Given** [precondition] — state of the system before the action
- **When** [trigger action] — what the user or system does
- **Then** [observable outcome] — verifiable result

`Edge Cases` subsection: REQUIRED (minimum 1 entry; use "N/A" only if explicitly justified).

---

## Section 3a: Functional Requirements

**Required**: Minimum 5 `MUST`-level requirements for any non-trivial feature.

Each FR entry MUST conform to:

```
- **FR-{NNN}**: {Subject} MUST|SHOULD|MAY {verb phrase} {object/context}.
```

**Constraints**:
- Sequential numeric IDs starting from `FR-001`.
- No implementation details: forbidden words include `database`, `API`, `REST`, `endpoint`, `Redis`, `MySQL`, `React`, `Vue`, `Java`, `Python`, or equivalent technology names.
- `MUST` requirements require corresponding Acceptance Criteria in Section 2 or explicit cross-reference note.

---

## Section 3b: Quality and Verification Requirements

**Required**: Minimum 3 QR entries. MUST cover:
- At least 1 `Consistency` or `Structure` quality requirement.
- At least 1 `Measurable` quality requirement with a numeric target.
- At least 1 `Usability/Readability` requirement.

Each QR entry format:
```
- **QR-{NNN}**: {Quality constraint description with measurable criterion where applicable}.
```

---

## Section 3c: Key Entities

**Required if** the feature involves structured data capture, transformation, or multi-party information sharing.

Each entity block MUST include:
- Entity name (bold)
- Field list: at minimum name + type + purpose
- At least one relationship reference (or "standalone" if no relationships)

---

## Section 4: Success Criteria

**Required**: Minimum 3 measurable outcomes (SC entries).

Each SC entry MUST:
- Be quantifiable (include percentage, count, duration, or rate).
- Map to at least one FR or QR requirement.
- Be independently verifiable without subjective judgment.

Format:
```
- **SC-{NNN}**: {Quantified outcome statement}.
```

---

## Section 5: Assumptions

**Required**: Minimum 1 entry.

Each assumption MUST:
- State a condition that is assumed true but not verified in this spec.
- Not duplicate a success criterion.
- Include scope boundary if it constrains the feature (e.g., "仅适用于中文输出场景").

---

## Completeness Gate

A spec.md is considered **complete** when:

| Check | Pass Condition |
|-------|---------------|
| All 5 sections present | ✅ All section headers exist |
| P1 Story exists | ✅ At least one `Priority: P1` story |
| Acceptance Criteria coverage | ✅ Every P1 story has ≥ 2 AC (success + non-happy-path) |
| FR-MUST count | ✅ ≥ 5 MUST requirements |
| QR coverage | ✅ Performance + Security + Availability each covered |
| SC measurability | ✅ All SC entries contain numeric thresholds |
| No open NEEDS CLARIFICATION in MUST sections | ✅ FR/AC sections have no unresolved gap markers |
| GapItems listed if input was incomplete | ✅ GapItems documented (may be Waived with justification) |

---

## Versioning

- Contract version is independent of spec version.
- When a new mandatory field is added to this contract, the version MUST increment (minor for additive, major for breaking).
- Consumers MUST validate against the contract version declared in the spec header.

---

## Consumer Usage Notes

**For `speckit.plan` command**:
- Extract `Key Entities` → seed `data-model.md`
- Extract `Quality and Verification Requirements` → seed Constitution Check gates
- Extract `Success Criteria` metrics → seed Performance Gate definitions

**For backend / frontend agents**:
- Consume `Functional Requirements` → derive interface behaviors
- Consume `Acceptance Scenarios` → derive test case outlines
- Consume `Key Entities` → derive data structures

**For test agent**:
- Consume all `Acceptance Scenarios` directly as test case templates
- Consume all `QR` entries as non-functional test targets
- Flag any `NEEDS CLARIFICATION` markers as test-blocking items
