# Guardrails

## Constraints
- DO NOT add new dependencies without explicit approval.
- DO NOT introduce new services beyond the scope in `docs/01_PRD.md`.
- Keep services REST-based; no gRPC, no GraphQL.
- Use Spring Boot starters and Spring Data JPA where applicable.
- Keep package structure consistent: controller, service, repository, domain/entity, dto.

## Performance Requirements
- Avoid premature optimization or heavy caching layers without approval.
- Prefer straightforward JPA queries over complex custom SQL unless required.
- Keep request/response payloads minimal and consistent.

## Security Rules
- Never hardcode secrets, passwords, or tokens.
- Passwords must be hashed with BCrypt in `user-service`.
- JWT is generated in `user-service` and validated in `gateway`.
- Propagate authenticated identity via `X-User-Id` and `X-User-Roles` headers.
- Gateway must allow CORS for `http://localhost:4200`.
- Follow the API contract in `docs/05_API_CONTRACT.md` for all endpoints.

## Code Style Standards
- Use Java 21 and Spring Boot 3.x conventions.
- Keep controllers thin; put business logic in services.
- Use DTOs for request/response boundaries.
- Add minimal tests when endpoints or auth behavior changes.
