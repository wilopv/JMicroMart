# API Contract

## Conventions

- **Base URL**: `http://localhost:8080` (gateway)
- **Auth**: `Authorization: Bearer <jwt>`
- **Gateway headers**: `X-User-Id`, `X-User-Roles` (propagated after validation)
- **Content-Type**: `application/json`
- **CORS**: allow `http://localhost:4200`

## Auth

### POST `/api/users/register`
Registers a user.
- **Request**: `{ "email": string, "password": string }`
- **Response**: `201` `{ "id": string, "email": string, "roles": [string] }`

### POST `/api/users/login`
Authenticates a user and returns a JWT.
- **Request**: `{ "email": string, "password": string }`
- **Response**: `200` `{ "token": string }`

### GET `/api/users/me`
Returns the current authenticated user.
- **Headers**: `Authorization: Bearer <jwt>`
- **Response**: `200` `{ "id": string, "email": string, "roles": [string] }`

### GET `/api/users/me/addresses`
Returns the authenticated user's saved addresses (read-only).
- **Headers**: `Authorization: Bearer <jwt>`
- **Response**: `200` `[ { "id": string, "type": "DELIVERY" | "BILLING", "label": string, "line1": string, "line2": string, "city": string, "state": string, "postalCode": string, "country": string } ]`
- **Status**: Planned feature (not implemented yet).

## Products

### GET `/api/products`
Returns product list (read-only).
- **Response**: `200` `[ { "id": string, "name": string, "price": number, "currency": string, "imageUrl": string, "inStock": boolean } ]`

### GET `/api/products/{id}`
Returns product detail (read-only).
- **Response**: `200` `{ "id": string, "name": string, "description": string, "price": number, "currency": string, "category": string, "imageUrl": string, "inStock": boolean }`

## Health

### GET `/health`
Basic availability check.
- **Response**: `200` `{ "status": "ok" }`
- **Status**: Planned feature (not implemented yet).

## Errors

- `400` validation error
- `401` missing/invalid token
- `403` forbidden
- `404` not found
- `500` server error

## Versioning & Deprecation

- No versioning yet; add `/api/v1` when contracts stabilize.
