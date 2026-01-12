from app.database import create_db_and_tables

try:
    create_db_and_tables()
    print("Database tables created successfully!")
except Exception as e:
    print(f"Error creating database tables: {e}")
    import traceback
    traceback.print_exc()