# Book Store Service

A comprehensive book store management API built with **FastAPI** and **SQLAlchemy**.

## 🚀 Features

- **RESTful API**: Complete CRUD operations for books, authors, and categories
- **Database Management**: SQLAlchemy ORM with support for SQLite and PostgreSQL
- **Search & Filtering**: Advanced search capabilities with pagination
- **Data Validation**: Pydantic models for request/response validation
- **Documentation**: Auto-generated API documentation with Swagger UI
- **Testing**: Comprehensive test suite with pytest
- **Docker Support**: Containerized deployment with Docker and Docker Compose
- **CI/CD**: GitHub Actions for automated testing and deployment

## 📚 API Endpoints

### Books
- `GET /books/` - List all books with pagination and filtering
- `POST /books/` - Create a new book
- `GET /books/{book_id}` - Get book details
- `PUT /books/{book_id}` - Update book information
- `DELETE /books/{book_id}` - Delete a book
- `PATCH /books/{book_id}/stock` - Update book stock

### Authors
- `GET /authors/` - List all authors
- `POST /authors/` - Create a new author
- `GET /authors/{author_id}` - Get author details
- `PUT /authors/{author_id}` - Update author information
- `DELETE /authors/{author_id}` - Delete an author

### Categories
- `GET /categories/` - List all categories
- `POST /categories/` - Create a new category
- `GET /categories/{category_id}` - Get category details
- `PUT /categories/{category_id}` - Update category information
- `DELETE /categories/{category_id}` - Delete a category

### Search
- `GET /search/books/?q={query}` - Search books by title, author, or description

## 🛠️ Quick Start

### Prerequisites
- Python 3.8+
- pip

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/book_store_service_python_fastapi_sql.git
   cd book_store_service_python_fastapi_sql
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python run.py
   ```

4. **Access the API**
   - API Documentation: http://localhost:8000/docs
   - Alternative Docs: http://localhost:8000/redoc
   - Health Check: http://localhost:8000/health

### Using Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build and run with Docker
docker build -t book-store-service .
docker run -p 8000:8000 book-store-service
```

## 📖 Documentation

- [API Overview](api/overview.md)
- [Setup Guide](development/setup.md)
- [Testing Guide](development/testing.md)
- [Deployment Guide](development/deployment.md)

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app

# Run specific test file
pytest tests/test_main.py
```

## 📊 Sample Data

The application comes with pre-seeded sample data including:
- Popular books (Harry Potter, Game of Thrones, etc.)
- Famous authors (J.K. Rowling, George R.R. Martin, etc.)
- Book categories (Fantasy, Horror, Mystery, etc.)

## 🔧 Configuration

The application uses environment variables for configuration:

- `DATABASE_URL`: Database connection string (default: SQLite)
- `DEBUG`: Enable debug mode
- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 8000)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [documentation](api/overview.md)
2. Search existing [issues](https://github.com/yourusername/book_store_service_python_fastapi_sql/issues)
3. Create a new issue with detailed information

---

**Built with ❤️ using FastAPI and SQLAlchemy** 