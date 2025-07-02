import uvicorn
from app.main import app
from app.seed_data import seed_database

if __name__ == "__main__":
    # Seed the database with sample data
    print("Seeding database...")
    seed_database()
    
    # Run the FastAPI application
    print("Starting Book Store Service...")
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 