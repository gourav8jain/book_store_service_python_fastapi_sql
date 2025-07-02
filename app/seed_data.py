from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal
from datetime import datetime

def seed_database():
    db = SessionLocal()
    try:
        # Check if data already exists
        existing_authors = crud.get_authors(db, limit=1)
        if existing_authors:
            print("Database already seeded. Skipping...")
            return

        print("Seeding database with sample data...")

        # Create authors
        authors_data = [
            {
                "name": "J.K. Rowling",
                "biography": "British author best known for the Harry Potter series",
                "email": "jk.rowling@example.com"
            },
            {
                "name": "George R.R. Martin",
                "biography": "American novelist and short story writer, best known for A Song of Ice and Fire",
                "email": "grrm@example.com"
            },
            {
                "name": "Stephen King",
                "biography": "American author of horror, supernatural fiction, suspense, and fantasy novels",
                "email": "stephen.king@example.com"
            },
            {
                "name": "Agatha Christie",
                "biography": "English writer known for her detective novels",
                "email": "agatha.christie@example.com"
            },
            {
                "name": "Ernest Hemingway",
                "biography": "American novelist, short story writer, and journalist",
                "email": "ernest.hemingway@example.com"
            }
        ]

        authors = []
        for author_data in authors_data:
            author = crud.create_author(db, schemas.AuthorCreate(**author_data))
            authors.append(author)
            print(f"Created author: {author.name}")

        # Create categories
        categories_data = [
            {"name": "Fantasy", "description": "Fantasy literature and magical worlds"},
            {"name": "Horror", "description": "Horror and supernatural fiction"},
            {"name": "Mystery", "description": "Detective and mystery novels"},
            {"name": "Classic", "description": "Classic literature and timeless works"},
            {"name": "Science Fiction", "description": "Science fiction and futuristic stories"},
            {"name": "Romance", "description": "Romance novels and love stories"},
            {"name": "Thriller", "description": "Suspense and thriller novels"},
            {"name": "Young Adult", "description": "Books for young adult readers"}
        ]

        categories = []
        for category_data in categories_data:
            category = crud.create_category(db, schemas.CategoryCreate(**category_data))
            categories.append(category)
            print(f"Created category: {category.name}")

        # Create books
        books_data = [
            {
                "title": "Harry Potter and the Philosopher's Stone",
                "isbn": "9780747532699",
                "description": "The first book in the Harry Potter series, following the young wizard's first year at Hogwarts School of Witchcraft and Wizardry.",
                "price": 29.99,
                "stock_quantity": 50,
                "published_date": datetime(1997, 6, 26),
                "author_id": authors[0].id,
                "category_ids": [categories[0].id, categories[7].id]  # Fantasy, Young Adult
            },
            {
                "title": "A Game of Thrones",
                "isbn": "9780553103540",
                "description": "The first book in A Song of Ice and Fire series, set in the fictional continents of Westeros and Essos.",
                "price": 34.99,
                "stock_quantity": 30,
                "published_date": datetime(1996, 8, 1),
                "author_id": authors[1].id,
                "category_ids": [categories[0].id, categories[6].id]  # Fantasy, Thriller
            },
            {
                "title": "The Shining",
                "isbn": "9780385121675",
                "description": "A horror novel about a family's winter stay at an isolated hotel where an evil presence influences the father into violence.",
                "price": 24.99,
                "stock_quantity": 25,
                "published_date": datetime(1977, 1, 28),
                "author_id": authors[2].id,
                "category_ids": [categories[1].id, categories[6].id]  # Horror, Thriller
            },
            {
                "title": "Murder on the Orient Express",
                "isbn": "9780007119318",
                "description": "A detective novel featuring Hercule Poirot, investigating a murder on the Orient Express train.",
                "price": 19.99,
                "stock_quantity": 40,
                "published_date": datetime(1934, 1, 1),
                "author_id": authors[3].id,
                "category_ids": [categories[2].id]  # Mystery
            },
            {
                "title": "The Old Man and the Sea",
                "isbn": "9780684801223",
                "description": "A short novel about an aging Cuban fisherman who struggles with a giant marlin far out in the Gulf Stream.",
                "price": 14.99,
                "stock_quantity": 35,
                "published_date": datetime(1952, 9, 1),
                "author_id": authors[4].id,
                "category_ids": [categories[3].id]  # Classic
            },
            {
                "title": "Harry Potter and the Chamber of Secrets",
                "isbn": "9780747538493",
                "description": "The second book in the Harry Potter series, following Harry's second year at Hogwarts.",
                "price": 29.99,
                "stock_quantity": 45,
                "published_date": datetime(1998, 7, 2),
                "author_id": authors[0].id,
                "category_ids": [categories[0].id, categories[7].id]  # Fantasy, Young Adult
            },
            {
                "title": "The Stand",
                "isbn": "9780385121682",
                "description": "A post-apocalyptic horror/fantasy novel about a deadly plague that kills most of the world's population.",
                "price": 39.99,
                "stock_quantity": 20,
                "published_date": datetime(1978, 10, 3),
                "author_id": authors[2].id,
                "category_ids": [categories[1].id, categories[4].id]  # Horror, Science Fiction
            },
            {
                "title": "Death on the Nile",
                "isbn": "9780007119332",
                "description": "A detective novel featuring Hercule Poirot, investigating a murder on a Nile steamer.",
                "price": 19.99,
                "stock_quantity": 30,
                "published_date": datetime(1937, 11, 1),
                "author_id": authors[3].id,
                "category_ids": [categories[2].id]  # Mystery
            }
        ]

        for book_data in books_data:
            book = crud.create_book(db, schemas.BookCreate(**book_data))
            print(f"Created book: {book.title}")

        print("Database seeding completed successfully!")

    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database() 