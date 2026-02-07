import asyncio
from fastapi import FastAPI
from fastapi.testclient import TestClient
from app.main import app
from app.api.routers.auth import sign_up
from app.models import UserCreate

# Test the sign_up function directly
def test_sign_up():
    try:
        # Create a mock session
        from sqlmodel import Session, create_engine
        from app.database import DATABASE_URL
        
        engine = create_engine(DATABASE_URL)
        
        # Create a session
        with Session(engine) as session:
            # Create user data
            user_data = UserCreate(email="test@example.com", password="password123", name="Test User")
            
            # Call the sign_up function
            result = sign_up(user_data, session)
            print("Sign up successful:", result)
            return result
    except Exception as e:
        print(f"Error during sign up: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_sign_up()