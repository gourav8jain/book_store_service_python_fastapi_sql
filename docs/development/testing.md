# Testing Guide

This guide covers testing the Book Store Service API.

## Running Tests

### Basic Test Execution

```bash
# Run all tests
pytest

# Run with verbose output
pytest -v

# Run with coverage
pytest --cov=app

# Run specific test file
pytest tests/test_main.py

# Run specific test function
pytest tests/test_main.py::test_read_root
```

### Test Configuration

The project uses `pytest.ini` for configuration:

```ini
[tool:pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
addopts = -v --tb=short
```

## Test Structure

```
tests/
├── __init__.py
├── test_main.py          # API endpoint tests
├── test_crud.py          # CRUD operation tests
├── test_models.py        # Model tests
└── conftest.py           # Test configuration
```

## Writing Tests

### API Endpoint Tests

```python
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_book():
    book_data = {
        "title": "Test Book",
        "isbn": "1234567890123",
        "price": 19.99,
        "author_id": 1
    }
    response = client.post("/books/", json=book_data)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == book_data["title"]
```

### Database Tests

```python
from sqlalchemy.orm import Session
from app import crud, models, schemas

def test_create_author(db: Session):
    author_data = schemas.AuthorCreate(
        name="Test Author",
        email="test@example.com"
    )
    author = crud.create_author(db, author_data)
    assert author.name == "Test Author"
    assert author.email == "test@example.com"
```

## Test Fixtures

### Database Fixture

```python
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base

@pytest.fixture
def db():
    engine = create_engine("sqlite:///./test.db")
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)
    
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)
```

### Client Fixture

```python
@pytest.fixture
def client():
    from fastapi.testclient import TestClient
    from app.main import app
    return TestClient(app)
```

## Coverage

### Running Coverage

```bash
# Generate coverage report
pytest --cov=app --cov-report=html

# View coverage in browser
open htmlcov/index.html
```

### Coverage Configuration

Add to `pytest.ini`:

```ini
[tool:pytest]
addopts = --cov=app --cov-report=term-missing
```

## Integration Tests

### Testing with Real Database

```python
def test_full_book_workflow(client, db):
    # Create author
    author_data = {"name": "Test Author", "email": "test@example.com"}
    author_response = client.post("/authors/", json=author_data)
    author_id = author_response.json()["id"]
    
    # Create book
    book_data = {
        "title": "Test Book",
        "isbn": "1234567890123",
        "price": 19.99,
        "author_id": author_id
    }
    book_response = client.post("/books/", json=book_data)
    assert book_response.status_code == 200
    
    # Verify book was created
    book_id = book_response.json()["id"]
    get_response = client.get(f"/books/{book_id}")
    assert get_response.status_code == 200
    assert get_response.json()["title"] == "Test Book"
```

## Performance Tests

### Load Testing

```python
import time
import requests

def test_api_performance():
    start_time = time.time()
    
    for _ in range(100):
        response = requests.get("http://localhost:8000/books/")
        assert response.status_code == 200
    
    end_time = time.time()
    duration = end_time - start_time
    
    assert duration < 10  # Should complete in under 10 seconds
```

## Best Practices

1. **Test Isolation**: Each test should be independent
2. **Clean Data**: Use fixtures to set up and tear down test data
3. **Meaningful Assertions**: Test behavior, not implementation
4. **Coverage**: Aim for high test coverage
5. **Fast Tests**: Keep tests fast and efficient

## Continuous Integration

The project includes GitHub Actions for automated testing:

```yaml
- name: Run tests
  run: |
    pytest tests/ -v --cov=app --cov-report=xml
```

## Debugging Tests

### Verbose Output

```bash
pytest -v -s
```

### Debugging Specific Test

```bash
pytest tests/test_main.py::test_create_book -v -s --pdb
```

### Test Discovery

```bash
# List all tests
pytest --collect-only

# Show test names
pytest --collect-only -q
``` 