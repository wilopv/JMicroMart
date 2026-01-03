# Architecture

## Architecture Type
Monorepo with Java microservices using Spring Boot 3.x and Spring Cloud. Services communicate via REST and register with Eureka.

## Services
- **discovery**: Eureka Server for service registration and discovery only.
- **gateway**: Spring Cloud Gateway. Single public entry point; routing, JWT validation, and CORS.
- **user-service**: Auth and user management. Registration, login, `/me`. PostgreSQL.
- **product-service**: Product catalog read-only endpoints. PostgreSQL.

## Service Boundaries
- Each service owns its database schema.
- No shared databases or cross-service joins.
- REST-only communication between services.

## Security
- JWT generated in user-service and validated in gateway.
- Gateway propagates identity via `X-User-Id` and `X-User-Roles`.
- Stateless authentication; no server-side sessions.

## Account Data
- Addresses are managed in user-service and exposed as read-only for the frontend.

## Not Allowed
- GraphQL, gRPC, or reactive stacks in business services.
- Additional services beyond the current scope.
- Replacing Spring Boot starters with custom wiring.

## Operational Considerations
- Local development via Docker Compose.
- Configuration via environment variables.
- Keep logs concise and structured.
