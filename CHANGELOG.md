# Changelog

All notable changes to the Book Store Service will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-01

### Added
- Initial release of Book Store Service
- Complete RESTful API for books, authors, and categories
- SQLAlchemy ORM with SQLite and PostgreSQL support
- Pydantic models for data validation
- Auto-generated API documentation with Swagger UI and ReDoc
- Comprehensive CRUD operations
- Advanced search and filtering capabilities
- Pagination support
- Stock management functionality
- Comprehensive test suite with pytest
- Docker and Docker Compose support
- GitHub Actions CI/CD pipeline
- GitHub Pages deployment
- Sample data seeding
- Health check endpoint
- CORS middleware support
- Error handling and validation
- Project documentation with MkDocs

### Features
- **Books Management**: Create, read, update, delete books with author and category relationships
- **Authors Management**: Complete author CRUD operations
- **Categories Management**: Category management with book associations
- **Search & Filter**: Advanced search by title, author, category, price range, and stock availability
- **Stock Management**: Update book stock quantities
- **Pagination**: Efficient pagination for large datasets
- **Data Validation**: Comprehensive input validation using Pydantic
- **Database Support**: SQLite for development, PostgreSQL for production
- **Containerization**: Docker support for easy deployment
- **Testing**: Unit and integration tests with coverage reporting
- **Documentation**: Comprehensive API documentation and guides

### Technical Stack
- **Backend**: FastAPI 0.104.1
- **Database**: SQLAlchemy 2.0.23
- **Validation**: Pydantic 2.5.0
- **Testing**: pytest 7.4.3
- **Documentation**: MkDocs with Material theme
- **Containerization**: Docker and Docker Compose
- **CI/CD**: GitHub Actions
- **Deployment**: GitHub Pages

### API Endpoints
- `GET /` - Root endpoint with service information
- `GET /health` - Health check endpoint
- `GET /docs` - Interactive API documentation
- `GET /redoc` - Alternative API documentation

#### Books
- `GET /books/` - List books with pagination and filtering
- `POST /books/` - Create a new book
- `GET /books/{book_id}` - Get book details
- `PUT /books/{book_id}` - Update book information
- `DELETE /books/{book_id}` - Delete a book
- `PATCH /books/{book_id}/stock` - Update book stock

#### Authors
- `GET /authors/` - List all authors
- `POST /authors/` - Create a new author
- `GET /authors/{author_id}` - Get author details
- `PUT /authors/{author_id}` - Update author information
- `DELETE /authors/{author_id}` - Delete an author

#### Categories
- `GET /categories/` - List all categories
- `POST /categories/` - Create a new category
- `GET /categories/{category_id}` - Get category details
- `PUT /categories/{category_id}` - Update category information
- `DELETE /categories/{category_id}` - Delete a category

#### Search
- `GET /search/books/?q={query}` - Search books by title, author, or description

### Sample Data
The application comes pre-seeded with:
- 5 authors (J.K. Rowling, George R.R. Martin, Stephen King, Agatha Christie, Ernest Hemingway)
- 8 categories (Fantasy, Horror, Mystery, Classic, Science Fiction, Romance, Thriller, Young Adult)
- 8 books (Harry Potter series, Game of Thrones, The Shining, etc.)

### Deployment Options
- **Local Development**: Python virtual environment
- **Docker**: Containerized deployment
- **Production**: Systemd service with Nginx reverse proxy
- **Cloud**: Heroku, AWS, Google Cloud Platform support

### Documentation
- Comprehensive README with setup instructions
- API documentation with examples
- Development guides
- Deployment guides
- Testing documentation
- Quick start examples

---

## Future Versions

### [1.1.0] - Planned
- User authentication and authorization
- Order management system
- Payment integration
- Email notifications

### [1.2.0] - Planned
- Advanced search with Elasticsearch
- Rate limiting
- Caching with Redis
- GraphQL API

### [2.0.0] - Planned
- Mobile app support
- Real-time notifications
- Advanced analytics
- Multi-tenant support 