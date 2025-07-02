# Development Setup

This guide will help you set up the Book Store Service for development.

## Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- Git

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/book_store_service_python_fastapi_sql.git
cd book_store_service_python_fastapi_sql
```

### 2. Create Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Environment Configuration

Create a `.env` file in the root directory:

```env
DATABASE_URL=sqlite:///./bookstore.db
DEBUG=True
HOST=0.0.0.0
PORT=8000
```

### 5. Run the Application

```bash
python run.py
```

The application will be available at:
- API: http://localhost:8000
- Documentation: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

## Database Setup

The application uses SQLite by default for development. The database file will be created automatically when you first run the application.

### Using PostgreSQL (Optional)

1. Install PostgreSQL
2. Create a database
3. Update the `DATABASE_URL` in your `.env` file:

```env
DATABASE_URL=postgresql://username:password@localhost/bookstore
```

## Development Tools

### Code Formatting

```bash
# Install black
pip install black

# Format code
black app/ tests/
```

### Linting

```bash
# Install flake8
pip install flake8

# Run linter
flake8 app/ tests/
```

### Type Checking

```bash
# Install mypy
pip install mypy

# Run type checker
mypy app/
```

## IDE Setup

### VS Code

Install the following extensions:
- Python
- Pylance
- FastAPI Snippets

### PyCharm

The project should work out of the box with PyCharm. Make sure to:
1. Set the Python interpreter to your virtual environment
2. Mark the `app` directory as a source root

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Find process using port 8000
   lsof -i :8000
   
   # Kill the process
   kill -9 <PID>
   ```

2. **Database connection issues**
   - Check if the database file exists
   - Verify database permissions
   - For PostgreSQL, ensure the service is running

3. **Import errors**
   - Make sure you're in the virtual environment
   - Verify all dependencies are installed
   - Check Python path

### Getting Help

If you encounter issues:
1. Check the [GitHub Issues](https://github.com/yourusername/book_store_service_python_fastapi_sql/issues)
2. Create a new issue with detailed information
3. Include error messages and system information 