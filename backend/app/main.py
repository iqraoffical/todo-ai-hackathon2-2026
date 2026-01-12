from fastapi import FastAPI
from .api.routers import auth, tasks

app = FastAPI(title="Todo API", version="1.0.0")

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(tasks.router, prefix="/api", tags=["tasks"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo API"}