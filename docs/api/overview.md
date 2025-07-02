# API Overview

The Book Store Service API provides a comprehensive RESTful interface for managing books, authors, and categories. Built with FastAPI, it offers automatic documentation, data validation, and high performance.

## Base URL

```
http://localhost:8000
```

## Authentication

Currently, the API does not require authentication. In production, you should implement proper authentication and authorization.

## Response Format

All API responses follow a consistent JSON format:

### Success Response
```json
{
  "id": 1,
  "title": "Sample Book",
  "price": 29.99,
  "created_at": "2023-01-01T00:00:00Z"
}
```

### Error Response
```json
{
  "detail": "Error message"
}
```

### Paginated Response
```json
{
  "items": [...],
  "total": 100,
  "page": 1,
  "size": 10,
  "pages": 10
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Rate Limiting

Currently, there are no rate limits implemented. Consider implementing rate limiting for production use.

## Data Models

### Book
- `id`: Unique identifier
- `title`: Book title
- `isbn`: International Standard Book Number
- `description`: Book description
- `price`: Book price
- `stock_quantity`: Available stock
- `published_date`: Publication date
- `author_id`: Reference to author
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Author
- `id`: Unique identifier
- `name`: Author name
- `biography`: Author biography
- `email`: Author email
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Category
- `id`: Unique identifier
- `name`: Category name
- `description`: Category description
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp 