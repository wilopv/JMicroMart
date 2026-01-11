# Database Schema

## Status
Current MVP schema implemented in the backend.

## user-service

### users
- **id**: bigint, PK (auto-generated)
- **email**: varchar, unique, required
- **password_hash**: varchar, required
- **roles**: varchar (comma-separated), required

### addresses
- **id**: bigint, PK (auto-generated)
- **user_id**: varchar, required
- **street**: varchar, required
- **city**: varchar, required
- **country**: varchar, required
- **postal_code**: varchar, required

Notes:
- Store only password hashes (BCrypt).
- Roles include `USER` at minimum.
- `user_id` is a header-derived identifier; no FK enforced in MVP.

## product-service

### products
- **id**: bigint, PK (auto-generated)
- **name**: varchar, required
- **description**: text, optional
- **price**: numeric(12,2), required
- **image_url**: varchar, optional

## Relationships
- User has many addresses (user-service only).
- No cross-service relationships or joins.
