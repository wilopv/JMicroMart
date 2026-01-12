# API Contract

## Conventions

- **Base URL**: `http://localhost:8080` (gateway)
- **Auth**: `Authorization: Bearer <jwt>` (gateway validates and injects headers)
- **Gateway headers**: `X-User-Id`, `X-User-Roles`
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
- **Headers**: `X-User-Id` (from gateway)
- **Response**: `200` `{ "id": string, "email": string, "roles": [string] }`

### GET `/api/users/me/addresses`
Lists stored addresses for the authenticated user.
- **Headers**: `X-User-Id`
- **Response**: `200` `[ { "id": number, "userId": string, "street": string, "city": string, "country": string, "postalCode": string } ]`

### POST `/api/users/me/addresses`
Creates an address for the authenticated user.
- **Headers**: `X-User-Id`
- **Request**: `{ "street": string, "city": string, "country": string, "postalCode": string }`
- **Response**: `201` `{ "id": number, "userId": string, "street": string, "city": string, "country": string, "postalCode": string }`

### GET `/api/users/me/favorites`
Lists favorite product ids for the authenticated user.
- **Headers**: `X-User-Id`
- **Response**: `200` `[ { "id": number, "userId": string, "productId": number } ]`

### POST `/api/users/me/favorites/{productId}`
Adds a product to the authenticated user's favorites.
- **Headers**: `X-User-Id`
- **Response**: `201` `{ "id": number, "userId": string, "productId": number }`
- **Errors**: `409` when the favorite already exists

### DELETE `/api/users/me/favorites/{productId}`
Removes a product from the authenticated user's favorites.
- **Headers**: `X-User-Id`
- **Response**: `204`

## Products

### GET `/api/products`
Returns product list (read-only).
- **Response**: `200` `[ { "id": number, "name": string, "price": number, "image": string, "category": string, "rating": number, "reviews": number } ]`

### GET `/api/products/{id}`
Returns product detail (read-only).
- **Response**: `200` `{ "id": number, "name": string, "price": number, "image": string, "category": string, "rating": number, "reviews": number }`

## Orders

### POST `/api/orders`
Creates an order for the authenticated user and calculates total amount.
- **Headers**: `X-User-Id`
- **Request**: `{ "items": [ { "productId": number, "productName": string, "price": number, "quantity": number } ] }`
- **Response**: `201` `{ "id": number, "userId": string, "status": string, "totalAmount": number, "createdAt": string, "items": [ { "id": number, "productId": number, "productName": string, "price": number, "quantity": number } ] }`

### GET `/api/orders`
Lists orders for the authenticated user.
- **Headers**: `X-User-Id`
- **Response**: `200` `[ { "id": number, "userId": string, "status": string, "totalAmount": number, "createdAt": string, "items": [ { "id": number, "productId": number, "productName": string, "price": number, "quantity": number } ] } ]`

### GET `/api/orders/{id}`
Retrieves a single order for the authenticated user.
- **Headers**: `X-User-Id`
- **Response**: `200` `{ "id": number, "userId": string, "status": string, "totalAmount": number, "createdAt": string, "items": [ { "id": number, "productId": number, "productName": string, "price": number, "quantity": number } ] }`

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
