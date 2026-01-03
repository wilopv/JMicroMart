# Prompts

## Service Endpoint Prompt
Use when creating or updating REST endpoints.
1. Read `docs/01_PRD.md`, `docs/02_ARCHITECTURE.md`, and `docs/05_API_CONTRACT.md`.
2. Summarize the endpoint behavior, request/response DTOs, and validation rules.
3. Implement controller, service, repository, and entity changes as needed.
4. Respect guardrails, file structure, and naming conventions.

## Auth/JWT Prompt
Use when working on authentication or gateway validation.
1. Confirm JWT rules in `docs/05_API_CONTRACT.md`.
2. Implement token generation in `user-service` only.
3. Implement validation and header propagation in `gateway`.
4. Avoid storing secrets; use environment configuration where appropriate.
5. Add minimal tests for auth flows when feasible.

## Data Model Prompt
Use when adding or changing persistence models.
1. Read `docs/04_DB_SCHEMA.md` and update it if the schema changes.
2. Define entities, repositories, and DTOs with clear boundaries.
3. Use PostgreSQL per service; avoid cross-service joins or shared schema.
4. Keep migrations optional unless required.

## Infrastructure Prompt
Use when changing local infra or runtime config.
1. Follow `docs/03_TECH_STACK.md` for tooling and versions.
2. Use environment variables for config and secrets.
3. Keep Docker Compose the default local runner.

## Guardrail Validation Prompt
Checklist after code changes:
- All changes align with the PRD and architecture docs.
- No new dependencies were added without approval.
- REST contracts match `docs/05_API_CONTRACT.md`.
- JWT flow is user-service generate, gateway validate.
- Services remain within scope: discovery, gateway, user-service, product-service.
