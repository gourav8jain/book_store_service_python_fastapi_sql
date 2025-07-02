from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# Base schemas
class AuthorBase(BaseModel):
    name: str
    biography: Optional[str] = None
    email: EmailStr

class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None

class BookBase(BaseModel):
    title: str
    isbn: str
    description: Optional[str] = None
    price: float
    stock_quantity: int = 0
    published_date: Optional[datetime] = None

# Create schemas
class AuthorCreate(AuthorBase):
    pass

class CategoryCreate(CategoryBase):
    pass

class BookCreate(BookBase):
    author_id: int
    category_ids: Optional[List[int]] = []

# Update schemas
class AuthorUpdate(BaseModel):
    name: Optional[str] = None
    biography: Optional[str] = None
    email: Optional[EmailStr] = None

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class BookUpdate(BaseModel):
    title: Optional[str] = None
    isbn: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    stock_quantity: Optional[int] = None
    published_date: Optional[datetime] = None
    author_id: Optional[int] = None
    category_ids: Optional[List[int]] = None

# Response schemas
class AuthorResponse(AuthorBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class CategoryResponse(CategoryBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class BookResponse(BookBase):
    id: int
    author_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    author: AuthorResponse
    categories: List[CategoryResponse] = []

    class Config:
        from_attributes = True

# Search and filter schemas
class BookSearch(BaseModel):
    title: Optional[str] = None
    author_name: Optional[str] = None
    category_name: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    in_stock: Optional[bool] = None

# Pagination schema
class PaginationParams(BaseModel):
    page: int = 1
    size: int = 10

class PaginatedResponse(BaseModel):
    items: List[BookResponse]
    total: int
    page: int
    size: int
    pages: int 