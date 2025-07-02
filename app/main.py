from fastapi import FastAPI, Depends, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import math

from . import crud, models, schemas
from .database import engine, get_db

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="Book Store Service",
    description="A comprehensive book store management API built with FastAPI and SQLAlchemy",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/", tags=["Root"])
def read_root():
    return {
        "message": "Welcome to Book Store Service API",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }

# Health check endpoint
@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy", "service": "book-store-service"}

# Author endpoints
@app.post("/authors/", response_model=schemas.AuthorResponse, tags=["Authors"])
def create_author(author: schemas.AuthorCreate, db: Session = Depends(get_db)):
    return crud.create_author(db=db, author=author)

@app.get("/authors/", response_model=List[schemas.AuthorResponse], tags=["Authors"])
def read_authors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    authors = crud.get_authors(db, skip=skip, limit=limit)
    return authors

@app.get("/authors/{author_id}", response_model=schemas.AuthorResponse, tags=["Authors"])
def read_author(author_id: int, db: Session = Depends(get_db)):
    db_author = crud.get_author(db, author_id=author_id)
    if db_author is None:
        raise HTTPException(status_code=404, detail="Author not found")
    return db_author

@app.put("/authors/{author_id}", response_model=schemas.AuthorResponse, tags=["Authors"])
def update_author(author_id: int, author: schemas.AuthorUpdate, db: Session = Depends(get_db)):
    db_author = crud.update_author(db, author_id=author_id, author=author)
    if db_author is None:
        raise HTTPException(status_code=404, detail="Author not found")
    return db_author

@app.delete("/authors/{author_id}", tags=["Authors"])
def delete_author(author_id: int, db: Session = Depends(get_db)):
    success = crud.delete_author(db, author_id=author_id)
    if not success:
        raise HTTPException(status_code=404, detail="Author not found")
    return {"message": "Author deleted successfully"}

# Category endpoints
@app.post("/categories/", response_model=schemas.CategoryResponse, tags=["Categories"])
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    return crud.create_category(db=db, category=category)

@app.get("/categories/", response_model=List[schemas.CategoryResponse], tags=["Categories"])
def read_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    categories = crud.get_categories(db, skip=skip, limit=limit)
    return categories

@app.get("/categories/{category_id}", response_model=schemas.CategoryResponse, tags=["Categories"])
def read_category(category_id: int, db: Session = Depends(get_db)):
    db_category = crud.get_category(db, category_id=category_id)
    if db_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return db_category

@app.put("/categories/{category_id}", response_model=schemas.CategoryResponse, tags=["Categories"])
def update_category(category_id: int, category: schemas.CategoryUpdate, db: Session = Depends(get_db)):
    db_category = crud.update_category(db, category_id=category_id, category=category)
    if db_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return db_category

@app.delete("/categories/{category_id}", tags=["Categories"])
def delete_category(category_id: int, db: Session = Depends(get_db)):
    success = crud.delete_category(db, category_id=category_id)
    if not success:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"message": "Category deleted successfully"}

# Book endpoints
@app.post("/books/", response_model=schemas.BookResponse, tags=["Books"])
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    return crud.create_book(db=db, book=book)

@app.get("/books/", response_model=schemas.PaginatedResponse, tags=["Books"])
def read_books(
    page: int = Query(1, ge=1, description="Page number"),
    size: int = Query(10, ge=1, le=100, description="Items per page"),
    title: Optional[str] = Query(None, description="Filter by book title"),
    author_name: Optional[str] = Query(None, description="Filter by author name"),
    category_name: Optional[str] = Query(None, description="Filter by category name"),
    min_price: Optional[float] = Query(None, ge=0, description="Minimum price"),
    max_price: Optional[float] = Query(None, ge=0, description="Maximum price"),
    in_stock: Optional[bool] = Query(None, description="Filter by stock availability"),
    db: Session = Depends(get_db)
):
    skip = (page - 1) * size
    
    # Create search object
    search = schemas.BookSearch(
        title=title,
        author_name=author_name,
        category_name=category_name,
        min_price=min_price,
        max_price=max_price,
        in_stock=in_stock
    )
    
    books = crud.get_books(db, skip=skip, limit=size, search=search)
    total = crud.get_books_count(db, search=search)
    pages = math.ceil(total / size)
    
    return schemas.PaginatedResponse(
        items=books,
        total=total,
        page=page,
        size=size,
        pages=pages
    )

@app.get("/books/{book_id}", response_model=schemas.BookResponse, tags=["Books"])
def read_book(book_id: int, db: Session = Depends(get_db)):
    db_book = crud.get_book(db, book_id=book_id)
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return db_book

@app.put("/books/{book_id}", response_model=schemas.BookResponse, tags=["Books"])
def update_book(book_id: int, book: schemas.BookUpdate, db: Session = Depends(get_db)):
    db_book = crud.update_book(db, book_id=book_id, book=book)
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return db_book

@app.delete("/books/{book_id}", tags=["Books"])
def delete_book(book_id: int, db: Session = Depends(get_db)):
    success = crud.delete_book(db, book_id=book_id)
    if not success:
        raise HTTPException(status_code=404, detail="Book not found")
    return {"message": "Book deleted successfully"}

@app.patch("/books/{book_id}/stock", response_model=schemas.BookResponse, tags=["Books"])
def update_book_stock(
    book_id: int, 
    quantity_change: int = Query(..., description="Change in stock quantity (positive for addition, negative for reduction)"),
    db: Session = Depends(get_db)
):
    db_book = crud.update_book_stock(db, book_id=book_id, quantity_change=quantity_change)
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return db_book

# Search endpoint
@app.get("/search/books/", response_model=List[schemas.BookResponse], tags=["Search"])
def search_books(
    q: str = Query(..., description="Search query for book title, author, or description"),
    db: Session = Depends(get_db)
):
    # This is a simple search implementation
    # In a production environment, you might want to use full-text search
    books = crud.get_books(db, search=schemas.BookSearch(title=q))
    return books

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 