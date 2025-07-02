# Quick Start Examples

This guide provides quick examples to get you started with the Book Store Service API.

## Prerequisites

- The Book Store Service running on `http://localhost:8000`
- A tool like `curl`, Postman, or any HTTP client

## Basic Operations

### 1. Health Check

```bash
curl http://localhost:8000/health
```

Response:
```json
{
  "status": "healthy",
  "service": "book-store-service"
}
```

### 2. Get All Books

```bash
curl http://localhost:8000/books/
```

Response:
```json
{
  "items": [
    {
      "id": 1,
      "title": "Harry Potter and the Philosopher's Stone",
      "isbn": "9780747532699",
      "description": "The first book in the Harry Potter series...",
      "price": 29.99,
      "stock_quantity": 50,
      "published_date": "1997-06-26T00:00:00",
      "author_id": 1,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": null,
      "author": {
        "id": 1,
        "name": "J.K. Rowling",
        "biography": "British author best known for the Harry Potter series",
        "email": "jk.rowling@example.com",
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": null
      },
      "categories": [
        {
          "id": 1,
          "name": "Fantasy",
          "description": "Fantasy literature and magical worlds",
          "created_at": "2023-01-01T00:00:00Z",
          "updated_at": null
        }
      ]
    }
  ],
  "total": 8,
  "page": 1,
  "size": 10,
  "pages": 1
}
```

### 3. Create an Author

```bash
curl -X POST http://localhost:8000/authors/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "biography": "A talented author with many published works",
    "email": "jane.doe@example.com"
  }'
```

Response:
```json
{
  "id": 6,
  "name": "Jane Doe",
  "biography": "A talented author with many published works",
  "email": "jane.doe@example.com",
  "created_at": "2023-01-01T12:00:00Z",
  "updated_at": null
}
```

### 4. Create a Category

```bash
curl -X POST http://localhost:8000/categories/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Biography",
    "description": "Biographical works and memoirs"
  }'
```

Response:
```json
{
  "id": 9,
  "name": "Biography",
  "description": "Biographical works and memoirs",
  "created_at": "2023-01-01T12:00:00Z",
  "updated_at": null
}
```

### 5. Create a Book

```bash
curl -X POST http://localhost:8000/books/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Book",
    "isbn": "9781234567890",
    "description": "An amazing first book by a new author",
    "price": 24.99,
    "stock_quantity": 25,
    "author_id": 6,
    "category_ids": [9]
  }'
```

Response:
```json
{
  "id": 9,
  "title": "My First Book",
  "isbn": "9781234567890",
  "description": "An amazing first book by a new author",
  "price": 24.99,
  "stock_quantity": 25,
  "published_date": null,
  "author_id": 6,
  "created_at": "2023-01-01T12:00:00Z",
  "updated_at": null,
  "author": {
    "id": 6,
    "name": "Jane Doe",
    "biography": "A talented author with many published works",
    "email": "jane.doe@example.com",
    "created_at": "2023-01-01T12:00:00Z",
    "updated_at": null
  },
  "categories": [
    {
      "id": 9,
      "name": "Biography",
      "description": "Biographical works and memoirs",
      "created_at": "2023-01-01T12:00:00Z",
      "updated_at": null
    }
  ]
}
```

## Advanced Operations

### 1. Search Books

```bash
curl "http://localhost:8000/books/?title=Harry&min_price=20&max_price=40"
```

### 2. Update Book Stock

```bash
curl -X PATCH "http://localhost:8000/books/1/stock?quantity_change=-5"
```

### 3. Search Books by Query

```bash
curl "http://localhost:8000/search/books/?q=magic"
```

### 4. Pagination

```bash
curl "http://localhost:8000/books/?page=2&size=5"
```

## Python Examples

### Using requests library

```python
import requests

BASE_URL = "http://localhost:8000"

# Get all books
response = requests.get(f"{BASE_URL}/books/")
books = response.json()
print(f"Found {books['total']} books")

# Create an author
author_data = {
    "name": "John Smith",
    "biography": "A prolific writer",
    "email": "john.smith@example.com"
}
response = requests.post(f"{BASE_URL}/authors/", json=author_data)
author = response.json()
print(f"Created author: {author['name']}")

# Create a book
book_data = {
    "title": "Python Programming",
    "isbn": "9780987654321",
    "description": "Learn Python programming",
    "price": 39.99,
    "stock_quantity": 15,
    "author_id": author['id'],
    "category_ids": []
}
response = requests.post(f"{BASE_URL}/books/", json=book_data)
book = response.json()
print(f"Created book: {book['title']}")
```

### Using httpx (async)

```python
import httpx
import asyncio

BASE_URL = "http://localhost:8000"

async def main():
    async with httpx.AsyncClient() as client:
        # Get all books
        response = await client.get(f"{BASE_URL}/books/")
        books = response.json()
        print(f"Found {books['total']} books")
        
        # Search for specific books
        response = await client.get(f"{BASE_URL}/books/?title=Harry")
        harry_books = response.json()
        print(f"Found {len(harry_books['items'])} Harry Potter books")

asyncio.run(main())
```

## JavaScript Examples

### Using fetch

```javascript
const BASE_URL = 'http://localhost:8000';

// Get all books
async function getBooks() {
    const response = await fetch(`${BASE_URL}/books/`);
    const data = await response.json();
    console.log(`Found ${data.total} books`);
    return data.items;
}

// Create an author
async function createAuthor(authorData) {
    const response = await fetch(`${BASE_URL}/authors/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authorData)
    });
    return await response.json();
}

// Create a book
async function createBook(bookData) {
    const response = await fetch(`${BASE_URL}/books/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData)
    });
    return await response.json();
}

// Usage
async function main() {
    const books = await getBooks();
    console.log('Books:', books);
    
    const author = await createAuthor({
        name: 'Alice Johnson',
        biography: 'A talented writer',
        email: 'alice.johnson@example.com'
    });
    
    const book = await createBook({
        title: 'JavaScript Basics',
        isbn: '9781111111111',
        description: 'Learn JavaScript programming',
        price: 29.99,
        stock_quantity: 20,
        author_id: author.id,
        category_ids: []
    });
    
    console.log('Created book:', book);
}

main();
```

## Error Handling

### Common Error Responses

```json
// 404 Not Found
{
  "detail": "Book not found"
}

// 422 Validation Error
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}

// 400 Bad Request
{
  "detail": "Invalid request data"
}
```

### Error Handling in Python

```python
import requests

try:
    response = requests.get("http://localhost:8000/books/999")
    response.raise_for_status()
except requests.exceptions.HTTPError as e:
    if e.response.status_code == 404:
        print("Book not found")
    else:
        print(f"HTTP error: {e}")
except requests.exceptions.RequestException as e:
    print(f"Request error: {e}")
```

## Next Steps

1. Explore the interactive API documentation at `http://localhost:8000/docs`
2. Try different endpoints and parameters
3. Build a frontend application to consume the API
4. Implement authentication and authorization
5. Add more advanced features like order management 