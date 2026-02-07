#!/usr/bin/env python3
"""
Debug script to test the authentication functionality
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '.'))

from app.models import User
from app.database import get_session
from sqlmodel import Session, select
from jose import JWTError, jwt
import traceback

def test_database_connection():
    """Test if we can connect to the database and query users"""
    print("Testing database connection...")

    try:
        # Create a session
        with next(get_session()) as session:
            # Try to query users
            result = session.execute(select(User))
            users = result.scalars().all()
            print(f"Found {len(users)} users in database")

            for user in users:
                print(f"  - User: {user.email} (ID: {user.id})")

        print("Database connection test passed!")
        return True

    except Exception as e:
        print(f"Database connection test failed: {str(e)}")
        traceback.print_exc()
        return False

def test_jwt():
    """Test JWT functionality"""
    print("\nTesting JWT functionality...")
    
    SECRET_KEY = os.getenv("BETTER_AUTH_SECRET", "your-default-secret-key-change-this")
    ALGORITHM = "HS256"
    
    print(f"Using SECRET_KEY of length: {len(SECRET_KEY)}")
    
    # Test creating a simple token
    try:
        from datetime import datetime, timedelta
        payload = {
            "sub": "test-user-id",
            "email": "test@example.com",
            "exp": datetime.utcnow() + timedelta(minutes=30)
        }
        
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        print(f"Created test token: {token[:20]}...")
        
        # Test decoding the token
        decoded_payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(f"Decoded payload: {decoded_payload}")
        
        print("JWT functionality test passed!")
        return True
        
    except Exception as e:
        print(f"JWT functionality test failed: {str(e)}")
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("Starting authentication debugging...")
    
    db_ok = test_database_connection()
    jwt_ok = test_jwt()
    
    if db_ok and jwt_ok:
        print("\nAll tests passed! Authentication should work.")
    else:
        print("\nSome tests failed. Please check the errors above.")