# Database Schema

## Status
Initial backend schema. Update as services evolve.

## user-service

### users
- **id**: UUID, PK
- **email**: varchar, unique, required
- **password_hash**: varchar, required
- **roles**: varchar[] or text (comma-separated), required
- **created_at**: timestamp, required
- **updated_at**: timestamp, required

### addresses
- **id**: UUID, PK
- **user_id**: UUID, FK to users.id
- **type**: varchar (DELIVERY | BILLING), required
- **label**: varchar, optional
- **line1**: varchar, required
- **line2**: varchar, optional
- **city**: varchar, required
- **state**: varchar, optional
- **postal_code**: varchar, required
- **country**: varchar(2), required
- **created_at**: timestamp, required
- **updated_at**: timestamp, required

Notes:
- Store only password hashes (BCrypt).
- Roles include `USER` at minimum.

## product-service

### products
- **id**: UUID, PK
- **name**: varchar, required
- **description**: text, optional
- **price**: numeric(12,2), required
- **currency**: varchar(3), required
- **category**: varchar, optional
- **image_url**: varchar, optional
- **in_stock**: boolean, required
- **created_at**: timestamp, required
- **updated_at**: timestamp, required

## Relationships
- User has many addresses (user-service only).
- No cross-service relationships or joins.

## Data Migration
- Optional at this stage; add Flyway when schema changes become frequent.
