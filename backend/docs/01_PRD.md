# Product Requirements Document

## Product Summary

JMicroMart backend provides a functional REST API for an Angular frontend. It is a portfolio-oriented microservices system focused on code clarity, realistic architecture, and working endpoints over exhaustive completeness.

---

## Problem Statement

The frontend requires a stable API for authentication and product browsing. The backend must provide consistent JSON responses, JWT-based auth, and a single gateway entry point while remaining easy to run locally.

---

## Objectives

- Provide a single API entry point via a gateway service.
- Implement JWT-based authentication (token generation in user-service, validation in gateway).
- Expose `/me` for authenticated user context.
- Provide authenticated user addresses for the frontend account screen (read-only).
- Provide read-only product listing and detail endpoints.
- Keep services independently deployable with their own PostgreSQL schemas.
- Run all services locally with Docker Compose.

---

## In Scope (Current)

- discovery service (Eureka)
- gateway service (routing, JWT validation, CORS)
- user-service (registration, login, `/me`)
- user-service (read-only addresses)
- product-service (read-only catalog and details)

---

## Out of Scope

- GraphQL or gRPC.
- Shared databases across services.
- Kubernetes-based deployment.
- Advanced admin tooling or dashboards.
