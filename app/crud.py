from sqlalchemy.orm import Session, joinedload
from sqlalchemy import and_, or_
from typing import List, Optional
from . import models, schemas

# Author CRUD operations
def create_author(db: Session, author: schemas.AuthorCreate) -> models.Author:
    db_author = models.Author(**author.dict())
    db.add(db_author)
    db.commit()
    db.refresh(db_author)
    return db_author

def get_author(db: Session, author_id: int) -> Optional[models.Author]:
    return db.query(models.Author).filter(models.Author.id == author_id).first()

def get_authors(db: Session, skip: int = 0, limit: int = 100) -> List[models.Author]:
    return db.query(models.Author).offset(skip).limit(limit).all()

def update_author(db: Session, author_id: int, author: schemas.AuthorUpdate) -> Optional[models.Author]:
    db_author = get_author(db, author_id)
    if db_author:
        update_data = author.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_author, field, value)
        db.commit()
        db.refresh(db_author)
    return db_author

def delete_author(db: Session, author_id: int) -> bool:
    db_author = get_author(db, author_id)
    if db_author:
        db.delete(db_author)
        db.commit()
        return True
    return False

# Category CRUD operations
def create_category(db: Session, category: schemas.CategoryCreate) -> models.Category:
    db_category = models.Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def get_category(db: Session, category_id: int) -> Optional[models.Category]:
    return db.query(models.Category).filter(models.Category.id == category_id).first()

def get_categories(db: Session, skip: int = 0, limit: int = 100) -> List[models.Category]:
    return db.query(models.Category).offset(skip).limit(limit).all()

def update_category(db: Session, category_id: int, category: schemas.CategoryUpdate) -> Optional[models.Category]:
    db_category = get_category(db, category_id)
    if db_category:
        update_data = category.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_category, field, value)
        db.commit()
        db.refresh(db_category)
    return db_category

def delete_category(db: Session, category_id: int) -> bool:
    db_category = get_category(db, category_id)
    if db_category:
        db.delete(db_category)
        db.commit()
        return True
    return False

# Book CRUD operations
def create_book(db: Session, book: schemas.BookCreate) -> models.Book:
    book_data = book.dict()
    category_ids = book_data.pop('category_ids', [])
    
    db_book = models.Book(**book_data)
    
    # Add categories if provided
    if category_ids:
        categories = db.query(models.Category).filter(models.Category.id.in_(category_ids)).all()
        db_book.categories = categories
    
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def get_book(db: Session, book_id: int) -> Optional[models.Book]:
    return db.query(models.Book).options(
        joinedload(models.Book.author),
        joinedload(models.Book.categories)
    ).filter(models.Book.id == book_id).first()

def get_books(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    search: Optional[schemas.BookSearch] = None
) -> List[models.Book]:
    query = db.query(models.Book).options(
        joinedload(models.Book.author),
        joinedload(models.Book.categories)
    )
    
    if search:
        if search.title:
            query = query.filter(models.Book.title.ilike(f"%{search.title}%"))
        if search.author_name:
            query = query.join(models.Author).filter(models.Author.name.ilike(f"%{search.author_name}%"))
        if search.category_name:
            query = query.join(models.Category, models.Book.categories).filter(
                models.Category.name.ilike(f"%{search.category_name}%")
            )
        if search.min_price is not None:
            query = query.filter(models.Book.price >= search.min_price)
        if search.max_price is not None:
            query = query.filter(models.Book.price <= search.max_price)
        if search.in_stock is not None:
            if search.in_stock:
                query = query.filter(models.Book.stock_quantity > 0)
            else:
                query = query.filter(models.Book.stock_quantity == 0)
    
    return query.offset(skip).limit(limit).all()

def get_books_count(db: Session, search: Optional[schemas.BookSearch] = None) -> int:
    query = db.query(models.Book)
    
    if search:
        if search.title:
            query = query.filter(models.Book.title.ilike(f"%{search.title}%"))
        if search.author_name:
            query = query.join(models.Author).filter(models.Author.name.ilike(f"%{search.author_name}%"))
        if search.category_name:
            query = query.join(models.Category, models.Book.categories).filter(
                models.Category.name.ilike(f"%{search.category_name}%")
            )
        if search.min_price is not None:
            query = query.filter(models.Book.price >= search.min_price)
        if search.max_price is not None:
            query = query.filter(models.Book.price <= search.max_price)
        if search.in_stock is not None:
            if search.in_stock:
                query = query.filter(models.Book.stock_quantity > 0)
            else:
                query = query.filter(models.Book.stock_quantity == 0)
    
    return query.count()

def update_book(db: Session, book_id: int, book: schemas.BookUpdate) -> Optional[models.Book]:
    db_book = get_book(db, book_id)
    if db_book:
        update_data = book.dict(exclude_unset=True)
        category_ids = update_data.pop('category_ids', None)
        
        for field, value in update_data.items():
            setattr(db_book, field, value)
        
        if category_ids is not None:
            categories = db.query(models.Category).filter(models.Category.id.in_(category_ids)).all()
            db_book.categories = categories
        
        db.commit()
        db.refresh(db_book)
    return db_book

def delete_book(db: Session, book_id: int) -> bool:
    db_book = get_book(db, book_id)
    if db_book:
        db.delete(db_book)
        db.commit()
        return True
    return False

def update_book_stock(db: Session, book_id: int, quantity_change: int) -> Optional[models.Book]:
    db_book = get_book(db, book_id)
    if db_book:
        db_book.stock_quantity += quantity_change
        if db_book.stock_quantity < 0:
            db_book.stock_quantity = 0
        db.commit()
        db.refresh(db_book)
    return db_book 