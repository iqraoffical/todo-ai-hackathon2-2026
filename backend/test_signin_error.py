import sys

# Clear any cached modules to ensure we get the latest version
if 'app.api.routers.auth' in sys.modules:
    del sys.modules['app.api.routers.auth']

from app.api.routers.auth import sign_in, UserLogin, verify_password
from sqlmodel import Session, create_engine, select
from app.database import DATABASE_URL
from app.models import User

def test_sign_in():
    # Create a session
    engine = create_engine(DATABASE_URL)
    with Session(engine) as session:
        # First, let's check if the user exists and what the hashed password is
        result = session.execute(select(User).where(User.email == "test@example.com"))
        user = result.scalar_one_or_none()
        
        if user:
            print(f"User found: {user.email}")
            print(f"Hashed password in DB: {user.hashed_password[:50]}...")  # Print first 50 chars
            
            # Try to verify the password
            is_valid = verify_password("shortpass123", user.hashed_password)
            print(f"Password 'shortpass123' matches: {is_valid}")
            
            is_valid = verify_password("password123", user.hashed_password)
            print(f"Password 'password123' matches: {is_valid}")
        else:
            print("User not found in database")
            return
        
        # Create login credentials
        user_credentials = UserLogin(email="test@example.com", password="shortpass123")  # Use the correct password
        
        try:
            result = sign_in(user_credentials, session)
            print("Sign in successful:", result)
        except Exception as e:
            print(f"Error during sign in: {str(e)}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    test_sign_in()