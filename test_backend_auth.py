import requests
import json

# Test the backend auth endpoints
BASE_URL = "http://localhost:8000"

def test_signup():
    print("Testing sign-up endpoint...")
    signup_data = {
        "email": "test@example.com",
        "password": "password123",
        "name": "Test User"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/auth/sign-up", json=signup_data)
        print(f"Sign-up response status: {response.status_code}")
        print(f"Sign-up response: {response.text}")
        return response
    except Exception as e:
        print(f"Error during sign-up test: {str(e)}")
        return None

def test_signin():
    print("\nTesting sign-in endpoint...")
    signin_data = {
        "email": "test@example.com",
        "password": "password123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/auth/sign-in", json=signin_data)
        print(f"Sign-in response status: {response.status_code}")
        print(f"Sign-in response: {response.text}")
        return response
    except Exception as e:
        print(f"Error during sign-in test: {str(e)}")
        return None

if __name__ == "__main__":
    print("Running authentication endpoint tests...\n")
    
    # Test sign-up
    signup_resp = test_signup()
    
    # Test sign-in
    signin_resp = test_signin()
    
    print("\nAuthentication tests completed.")