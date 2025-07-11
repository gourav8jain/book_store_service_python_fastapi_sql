from fastapi import FastAPI, Query, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import math

app = FastAPI(
    title="Book Store Service (Mock)",
    description="A comprehensive book store management API (mock/in-memory mode)",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",  # For development - restrict this in production
        "https://gouravjain.github.io",
        "https://*.github.io",
        "http://localhost:3000",
        "http://localhost:8001"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory mock data
MOCK_AUTHORS = [
    {"id": 1, "name": "Mock Author 1", "biography": "Bio 1", "books_count": 1, "created_at": "2024-01-01T00:00:00"},
    {"id": 2, "name": "Mock Author 2", "biography": "Bio 2", "books_count": 1, "created_at": "2024-01-01T00:00:00"},
]
MOCK_CATEGORIES = [
    {"id": 1, "name": "Mock Category 1", "description": "Desc 1", "books_count": 1, "created_at": "2024-01-01T00:00:00"},
    {"id": 2, "name": "Mock Category 2", "description": "Desc 2", "books_count": 1, "created_at": "2024-01-01T00:00:00"},
]
MOCK_BOOKS = [
    {
        "id": 1,
        "title": "Mock Book 1",
        "author": MOCK_AUTHORS[0],
        "category": MOCK_CATEGORIES[0],
        "price": 10.99,
        "stock": 5,
        "description": "A mock book for testing.",
        "isbn": "1234567890",
        "publication_year": 2020,
        "pages": 200,
        "created_at": "2024-01-01T00:00:00",
        "updated_at": "2024-01-01T00:00:00"
    },
    {
        "id": 2,
        "title": "Mock Book 2",
        "author": MOCK_AUTHORS[1],
        "category": MOCK_CATEGORIES[1],
        "price": 15.99,
        "stock": 0,
        "description": "Another mock book.",
        "isbn": "0987654321",
        "publication_year": 2021,
        "pages": 300,
        "created_at": "2024-01-01T00:00:00",
        "updated_at": "2024-01-01T00:00:00"
    },
]

@app.get("/", tags=["Root"])
def read_root():
    return {
        "message": "Welcome to Book Store Service API (Mock)",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy", "service": "book-store-service-mock"}

# Authors
@app.get("/authors/", tags=["Authors"])
def read_authors(skip: int = 0, limit: int = 100, search: Optional[str] = None):
    items = MOCK_AUTHORS
    if search:
        items = [a for a in items if search.lower() in a["name"].lower()]
    return {"items": items[skip:skip+limit], "total": len(items)}

@app.get("/authors/{author_id}", tags=["Authors"])
def read_author(author_id: int):
    for author in MOCK_AUTHORS:
        if author["id"] == author_id:
            return author
    raise HTTPException(status_code=404, detail="Author not found")

@app.post("/authors/", tags=["Authors"])
def create_author(author: dict = Body(...)):
    new_id = max([a["id"] for a in MOCK_AUTHORS], default=0) + 1
    author["id"] = new_id
    author["created_at"] = "2024-01-01T00:00:00"
    MOCK_AUTHORS.append(author)
    return author

@app.put("/authors/{author_id}", tags=["Authors"])
def update_author(author_id: int, author: dict = Body(...)):
    for idx, a in enumerate(MOCK_AUTHORS):
        if a["id"] == author_id:
            author["id"] = author_id
            author["updated_at"] = "2024-01-01T00:00:00"
            MOCK_AUTHORS[idx] = author
            return author
    raise HTTPException(status_code=404, detail="Author not found")

@app.delete("/authors/{author_id}", tags=["Authors"])
def delete_author(author_id: int):
    for idx, a in enumerate(MOCK_AUTHORS):
        if a["id"] == author_id:
            del MOCK_AUTHORS[idx]
            return {"message": "Author deleted"}
    raise HTTPException(status_code=404, detail="Author not found")

# Categories
@app.get("/categories/", tags=["Categories"])
def read_categories(skip: int = 0, limit: int = 100, search: Optional[str] = None):
    items = MOCK_CATEGORIES
    if search:
        items = [c for c in items if search.lower() in c["name"].lower()]
    return {"items": items[skip:skip+limit], "total": len(items)}

@app.get("/categories/{category_id}", tags=["Categories"])
def read_category(category_id: int):
    for category in MOCK_CATEGORIES:
        if category["id"] == category_id:
            return category
    raise HTTPException(status_code=404, detail="Category not found")

@app.post("/categories/", tags=["Categories"])
def create_category(category: dict = Body(...)):
    new_id = max([c["id"] for c in MOCK_CATEGORIES], default=0) + 1
    category["id"] = new_id
    category["created_at"] = "2024-01-01T00:00:00"
    MOCK_CATEGORIES.append(category)
    return category

@app.put("/categories/{category_id}", tags=["Categories"])
def update_category(category_id: int, category: dict = Body(...)):
    for idx, c in enumerate(MOCK_CATEGORIES):
        if c["id"] == category_id:
            category["id"] = category_id
            category["updated_at"] = "2024-01-01T00:00:00"
            MOCK_CATEGORIES[idx] = category
            return category
    raise HTTPException(status_code=404, detail="Category not found")

@app.delete("/categories/{category_id}", tags=["Categories"])
def delete_category(category_id: int):
    for idx, c in enumerate(MOCK_CATEGORIES):
        if c["id"] == category_id:
            del MOCK_CATEGORIES[idx]
            return {"message": "Category deleted"}
    raise HTTPException(status_code=404, detail="Category not found")

# Books
@app.get("/books/", tags=["Books"])
def read_books(page: int = Query(1, ge=1), size: int = Query(10, ge=1, le=100), search: Optional[str] = None):
    items = MOCK_BOOKS
    if search:
        items = [b for b in items if search.lower() in b["title"].lower()]
    total = len(items)
    pages = math.ceil(total / size)
    skip = (page - 1) * size
    return {
        "items": items[skip:skip+size],
        "total": total,
        "page": page,
        "size": size,
        "pages": pages
    }

@app.get("/books/{book_id}", tags=["Books"])
def read_book(book_id: int):
    for book in MOCK_BOOKS:
        if book["id"] == book_id:
            return book
    raise HTTPException(status_code=404, detail="Book not found")

@app.post("/books/", tags=["Books"])
def create_book(book: dict = Body(...)):
    new_id = max([b["id"] for b in MOCK_BOOKS], default=0) + 1
    book["id"] = new_id
    # Attach author and category objects if ids are provided
    author_id = book.get("author_id")
    category_id = book.get("category_id")
    book["author"] = next((a for a in MOCK_AUTHORS if a["id"] == author_id), None)
    book["category"] = next((c for c in MOCK_CATEGORIES if c["id"] == category_id), None)
    book["created_at"] = "2024-01-01T00:00:00"
    book["updated_at"] = "2024-01-01T00:00:00"
    MOCK_BOOKS.append(book)
    return book

@app.put("/books/{book_id}", tags=["Books"])
def update_book(book_id: int, book: dict = Body(...)):
    for idx, b in enumerate(MOCK_BOOKS):
        if b["id"] == book_id:
            book["id"] = book_id
            author_id = book.get("author_id")
            category_id = book.get("category_id")
            book["author"] = next((a for a in MOCK_AUTHORS if a["id"] == author_id), None)
            book["category"] = next((c for c in MOCK_CATEGORIES if c["id"] == category_id), None)
            book["updated_at"] = "2024-01-01T00:00:00"
            MOCK_BOOKS[idx] = book
            return book
    raise HTTPException(status_code=404, detail="Book not found")

@app.delete("/books/{book_id}", tags=["Books"])
def delete_book(book_id: int):
    for idx, b in enumerate(MOCK_BOOKS):
        if b["id"] == book_id:
            del MOCK_BOOKS[idx]
            return {"message": "Book deleted"}
    raise HTTPException(status_code=404, detail="Book not found")

# Search
@app.get("/search/books/", tags=["Search"])
def search_books(q: str = Query(...)):
    items = [b for b in MOCK_BOOKS if q.lower() in b["title"].lower() or q.lower() in b["description"].lower()]
    return items

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 