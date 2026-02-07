import subprocess
import time
import requests
import signal
import sys

def run_server_and_test():
    print("Starting backend server...")
    
    # Start the backend server
    server_process = subprocess.Popen(['python', 'backend/main.py'], cwd='.')
    
    # Wait for the server to start
    time.sleep(5)
    
    print("Server started. Testing authentication endpoints...")
    
    # Test the sign-up endpoint
    try:
        signup_response = requests.post(
            'http://localhost:8000/api/auth/sign-up',
            json={
                'email': 'test@example.com',
                'password': 'password123',
                'name': 'Test User'
            },
            timeout=10
        )
        print(f"Sign-up response status: {signup_response.status_code}")
        print(f"Sign-up response text: {signup_response.text}")
    except Exception as e:
        print(f"Error during sign-up test: {str(e)}")
    
    # Test the sign-in endpoint
    try:
        signin_response = requests.post(
            'http://localhost:8000/api/auth/sign-in',
            json={
                'email': 'test@example.com',
                'password': 'password123'
            },
            timeout=10
        )
        print(f"Sign-in response status: {signin_response.status_code}")
        print(f"Sign-in response text: {signin_response.text}")
    except Exception as e:
        print(f"Error during sign-in test: {str(e)}")
    
    print("Stopping server...")
    server_process.terminate()
    server_process.wait()
    print("Server stopped.")

if __name__ == "__main__":
    run_server_and_test()