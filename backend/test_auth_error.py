import sys
import importlib

# Clear any cached modules to ensure we get the latest version
if 'app.api.routers.auth' in sys.modules:
    del sys.modules['app.api.routers.auth']

from app.api.routers.auth import sign_up, UserCreate
from sqlmodel import Session, create_engine
from app.database import DATABASE_URL

def test_sign_up():
    # Create a session
    engine = create_engine(DATABASE_URL)
    with Session(engine) as session:
        # Create user data with a shorter password to avoid bcrypt limits
        user_data = UserCreate(email="test@example.com", password="shortpass123", name="Test User")
        
        try:
            result = sign_up(user_data, session)
            print("Sign up successful:", result)
        except Exception as e:
            print(f"Error during sign up: {str(e)}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    test_sign_up()