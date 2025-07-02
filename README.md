# 📚 Book Store Service

A comprehensive book store management API built with **FastAPI** and **SQLAlchemy**. This service provides a complete RESTful API for managing books, authors, and categories with advanced search capabilities, pagination, and data validation.

## 🌟 Features

- **RESTful API**: Complete CRUD operations for books, authors, and categories
- **Database Management**: SQLAlchemy ORM with support for SQLite and PostgreSQL
- **Search & Filtering**: Advanced search capabilities with pagination
- **Data Validation**: Pydantic models for request/response validation
- **Auto Documentation**: Swagger UI and ReDoc documentation
- **Testing**: Comprehensive test suite with pytest
- **Docker Support**: Containerized deployment
- **CI/CD**: GitHub Actions for automated testing and deployment
- **GitHub Pages**: Live documentation and API reference

## 🚀 Quick Start

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
   - 🌐 **API Documentation**: http://localhost:8000/docs
   - 📖 **Alternative Docs**: http://localhost:8000/redoc
   - ❤️ **Health Check**: http://localhost:8000/health

### Using Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build and run with Docker
docker build -t book-store-service .
docker run -p 8000:8000 book-store-service
```

## 📖 API Endpoints

### Books
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/books/` | List all books with pagination and filtering |
| `POST` | `/books/` | Create a new book |
| `GET` | `/books/{book_id}` | Get book details |
| `PUT` | `/books/{book_id}` | Update book information |
| `DELETE` | `/books/{book_id}` | Delete a book |
| `PATCH` | `/books/{book_id}/stock` | Update book stock |

### Authors
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/authors/` | List all authors |
| `POST` | `/authors/` | Create a new author |
| `GET` | `/authors/{author_id}` | Get author details |
| `PUT` | `/authors/{author_id}` | Update author information |
| `DELETE` | `/authors/{author_id}` | Delete an author |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/categories/` | List all categories |
| `POST` | `/categories/` | Create a new category |
| `GET` | `/categories/{category_id}` | Get category details |
| `PUT` | `/categories/{category_id}` | Update category information |
| `DELETE` | `/categories/{category_id}` | Delete a category |

### Search
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/search/books/?q={query}` | Search books by title, author, or description |

## 📊 Sample Data

The application comes pre-seeded with sample data:

### Books
- Harry Potter and the Philosopher's Stone
- A Game of Thrones
- The Shining
- Murder on the Orient Express
- The Old Man and the Sea
- And more...

### Authors
- J.K. Rowling
- George R.R. Martin
- Stephen King
- Agatha Christie
- Ernest Hemingway

### Categories
- Fantasy
- Horror
- Mystery
- Classic
- Science Fiction
- Romance
- Thriller
- Young Adult

## 🧪 Testing

Run the comprehensive test suite:

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app

# Run specific test file
pytest tests/test_main.py

# Run with verbose output
pytest -v
```

## 🔧 Configuration

The application uses environment variables for configuration:

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `sqlite:///./bookstore.db` | Database connection string |
| `DEBUG` | `False` | Enable debug mode |
| `HOST` | `0.0.0.0` | Server host |
| `PORT` | `8000` | Server port |

## 📁 Project Structure

```
book_store_service_python_fastapi_sql/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI application
│   ├── database.py      # Database configuration
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic schemas
│   ├── crud.py          # CRUD operations
│   └── seed_data.py     # Sample data seeding
├── tests/
│   ├── __init__.py
│   └── test_main.py     # API tests
├── docs/                # Documentation
├── requirements.txt     # Python dependencies
├── run.py              # Application entry point
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose setup
├── pytest.ini         # Test configuration
├── mkdocs.yml         # Documentation configuration
└── README.md          # This file
```

## 🚀 Deployment

### Local Development
```bash
python run.py
```

### Docker Deployment
```bash
docker-compose up --build
```

### Production Deployment
1. Set up a production database (PostgreSQL recommended)
2. Configure environment variables
3. Use a production WSGI server like Gunicorn
4. Set up reverse proxy (Nginx)
5. Configure SSL certificates

## 📚 Documentation

- **Live API Documentation**: [GitHub Pages](https://yourusername.github.io/book_store_service_python_fastapi_sql/)
- **Interactive API Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow PEP 8 style guidelines
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass before submitting

## 🐛 Issues and Support

If you encounter any issues or have questions:

1. Check the [documentation](https://yourusername.github.io/book_store_service_python_fastapi_sql/)
2. Search existing [issues](https://github.com/yourusername/book_store_service_python_fastapi_sql/issues)
3. Create a new issue with detailed information

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) - Modern, fast web framework
- [SQLAlchemy](https://www.sqlalchemy.org/) - SQL toolkit and ORM
- [Pydantic](https://pydantic-docs.helpmanual.io/) - Data validation using Python type annotations
- [Pytest](https://docs.pytest.org/) - Testing framework

## 📈 Roadmap

- [ ] User authentication and authorization
- [ ] Order management system
- [ ] Payment integration
- [ ] Email notifications
- [ ] Advanced search with Elasticsearch
- [ ] Rate limiting
- [ ] Caching with Redis
- [ ] GraphQL API
- [ ] Mobile app support

---

**Built with ❤️ using FastAPI and SQLAlchemy**

[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green.svg)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0.23-red.svg)](https://www.sqlalchemy.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) 