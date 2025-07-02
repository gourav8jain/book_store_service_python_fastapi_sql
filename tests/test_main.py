from fastapi.testclient import TestClient
from app.main import app
import pytest

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert data["message"] == "Welcome to Book Store Service API"

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "book-store-service"

def test_get_authors():
    response = client.get("/authors/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_categories():
    response = client.get("/categories/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_books():
    response = client.get("/books/")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert "total" in data
    assert "page" in data
    assert "size" in data
    assert "pages" in data

def test_create_author():
    author_data = {
        "name": "Test Author",
        "biography": "A test author for testing purposes",
        "email": "test.author@example.com"
    }
    response = client.post("/authors/", json=author_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == author_data["name"]
    assert data["email"] == author_data["email"]

def test_create_category():
    category_data = {
        "name": "Test Category",
        "description": "A test category for testing purposes"
    }
    response = client.post("/categories/", json=category_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == category_data["name"]

def test_create_book():
    # First create an author and category
    author_data = {
        "name": "Book Test Author",
        "biography": "Author for book testing",
        "email": "book.test.author@example.com"
    }
    author_response = client.post("/authors/", json=author_data)
    author_id = author_response.json()["id"]
    
    category_data = {
        "name": "Book Test Category",
        "description": "Category for book testing"
    }
    category_response = client.post("/categories/", json=category_data)
    category_id = category_response.json()["id"]
    
    # Create a book
    book_data = {
        "title": "Test Book",
        "isbn": "1234567890123",
        "description": "A test book for testing purposes",
        "price": 19.99,
        "stock_quantity": 10,
        "author_id": author_id,
        "category_ids": [category_id]
    }
    response = client.post("/books/", json=book_data)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == book_data["title"]
    assert data["isbn"] == book_data["isbn"]
    assert data["price"] == book_data["price"]

def test_search_books():
    response = client.get("/search/books/?q=Harry")
    assert response.status_code == 200
    assert isinstance(response.json(), list) 