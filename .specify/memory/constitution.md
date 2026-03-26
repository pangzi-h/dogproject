<!--
Sync Impact Report
- Version change: 1.0.0 -> 2.0.0
- Modified principles:
	- I. Code Quality Is Non-Negotiable -> I. Contract First: API Is the Primary Interface
	- II. Test Standards Define Done -> II. Unified Standards: Eliminate Dialect Drift
	- III. User Experience Must Stay Consistent -> III. Layered Decoupling: Separation of Concerns
	- IV. Performance Budgets Are Required -> IV. Quality Built In: Shift Testing Left
	- V. Traceable Delivery and Incremental Safety -> V. Observability: Make Systems Explainable
	- Added new principle: VI. Security and Authorization: Defense in Depth
	- Added new principle: VII. Operations and Delivery: Continuous Delivery by Default
- Added sections:
	- Architecture and Delivery Constraints
	- Review Workflow and Release Gates
- Removed sections:
	- Engineering Standards and Constraints
	- Delivery Workflow and Quality Gates
- Templates requiring updates:
	- ✅ .specify/templates/plan-template.md
	- ✅ .specify/templates/spec-template.md
	- ✅ .specify/templates/tasks-template.md
	- ✅ README.md
	- ⚠ pending: .specify/templates/commands/*.md (directory not present; no command templates to update)
- Follow-up TODOs:
	- None
-->

# Dogproject Constitution

## Core Principles

### I. Contract First: API Is the Primary Interface
All externally consumed behavior MUST be defined as an explicit API contract before
implementation. Contracts MUST use versioned OpenAPI/Proto definitions, and
backward-incompatible changes MUST introduce a new version with a declared deprecation
window. Shared types SHOULD be generated from contracts to prevent drift between frontend
and backend. Rationale: contract-first development reduces ambiguity and integration risk.

### II. Unified Standards: Eliminate Dialect Drift
Code style, naming, branch conventions, and error-code taxonomy MUST be standardized and
enforced via automation (for example lint, formatter, hooks, CI checks). REST routes MUST
be consistent, JSON fields MUST follow one agreed case style, and error codes MUST map to
documented user-facing behavior. Rationale: standardization lowers coordination cost and
reduces avoidable defects.

### III. Layered Decoupling: Separation of Concerns
Frontend MUST separate UI, state, and API access layers; direct HTTP calls in UI
components are prohibited. Backend MUST enforce Controller-Service-DAO (or equivalent)
layering, where controllers handle protocol and validation only. Runtime configuration
MUST be externalized; environment-specific values MUST NOT be hardcoded. Rationale:
separation improves testability, scalability, and change safety.

### IV. Quality Built In: Shift Testing Left
Testing is mandatory and starts during design. Critical business logic MUST meet agreed
coverage thresholds (default baseline: backend service logic >= 80%; frontend critical
logic and hooks covered). Integration and contract tests MUST protect inter-service and
consumer compatibility. CI/CD MUST block merge when lint, required tests, or build
verification fail. Rationale: early validation prevents expensive downstream failures.

### V. Observability: Make Systems Explainable
Cross-boundary requests MUST carry trace identifiers, and backend logs MUST include them.
Monitoring MUST include frontend experience metrics and backend service metrics with clear
alert thresholds. Logs and events MUST be structured for search and correlation. Rationale:
diagnosability is essential for reliable operation and fast incident resolution.

### VI. Security and Authorization: Defense in Depth
Authentication and authorization MUST be centrally defined and consistently applied.
Frontend validation improves usability but backend validation is the final security gate.
Sensitive data MUST NOT be hardcoded or exposed in client bundles. Security-relevant
changes MUST include threat considerations and mitigation evidence. Rationale: layered
security controls reduce breach likelihood and impact.

### VII. Operations and Delivery: Continuous Delivery by Default
Frontend and backend SHOULD be deployable independently with explicit version identifiers
(for example commit ID or release tag). Every release MUST support rollback with clear
procedures. Delivery environments SHOULD be reproducible and consistent (for example
containerized workflows). Rationale: continuous delivery reduces release risk and enables
faster value delivery.

## Architecture and Delivery Constraints

- Contract definitions are authoritative and MUST be updated before dependent code changes.
- Code quality automation MUST run for every merge candidate.
- UX-consistency checks MUST validate loading, empty, error, and success states on changed
  user flows.
- Performance goals MUST define measurable targets and verification evidence.
- Security controls MUST include input validation, access checks, and secret management.
- Delivery plans MUST include rollback and version traceability details.

## Review Workflow and Release Gates

1. Specify: define requirements, API contracts, UX states, and measurable performance goals.
2. Plan: pass constitution gates for contract, standards, layering, tests, observability,
   security, and delivery readiness.
3. Task: include explicit tasks for contract updates, testing, observability, security,
   and release preparation.
4. Implement: deliver in independent increments with validation evidence per increment.
5. Review: block merge on failed gates unless time-bounded exception is approved.
6. Release: verify rollback readiness, version traceability, and production observability.

## Governance
This constitution supersedes conflicting local practices for specification, planning,
implementation, and review.

Amendment procedure:
1. Propose amendment with rationale and impacted artifacts.
2. Review impact on templates, workflow, and active work items.
3. Approve amendment and update dependent templates in the same change.
4. Record version bump and effective date in this file.

Versioning policy:
- MAJOR: removal or incompatible redefinition of a core principle or governance rule.
- MINOR: new principle/section or materially expanded mandatory guidance.
- PATCH: clarifications, wording improvements, and non-semantic refinements.

Compliance review expectations:
- Every plan MUST document seven constitution gate checks.
- Every task list MUST include required contract/test/observability/security/delivery work.
- Every review MUST confirm evidence for compatibility, test outcomes, and performance claims.

**Version**: 2.0.0 | **Ratified**: 2026-03-25 | **Last Amended**: 2026-03-25
