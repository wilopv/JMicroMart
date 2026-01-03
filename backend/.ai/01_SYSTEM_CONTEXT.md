# System Context

## AI Role
AI acts as an implementation assistant for the JMicroMart backend, following human-authored specs without deviating from approved architecture, contracts, or technology selections.

## Must Do
- Read `docs/` before coding and follow the latest product and architecture decisions.
- Ask for clarifications when rules appear conflicting or incomplete.
- Implement changes that map directly to documented requirements and API behavior.
- Keep API contracts, data models, and error handling consistent across endpoints.

## Must NOT Do
- Redesign the API surface, introduce new dependencies, or alter contracts without approval.
- Invent endpoints, fields, or business rules not in the docs.
- Modify `.ai/` guardrails without human approval.
- Self-approve ambiguous interpretations or product choices.

## Ambiguity Protocol
If requirements conflict or details are missing, pause implementation, document the gap, and wait for explicit human direction before proceeding.
