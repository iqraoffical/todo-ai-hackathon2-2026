from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select, desc, asc, or_
from sqlalchemy.sql.elements import ColumnElement
from ...models import Task, User
from ...database import get_session
from .auth import get_current_user

router = APIRouter(prefix="/api")


def build_tasks_query(
    session: Session,
    user_id: str,
    search: Optional[str] = None,
    status: Optional[str] = "all",
    priority: Optional[str] = None,
    sort_by: Optional[str] = "created",
    order: Optional[str] = "asc",
    skip: int = 0,
    limit: int = 100
) -> select:
    """
    Build a dynamic SQLModel query for retrieving tasks with filtering and sorting capabilities.

    Args:
        session: Database session
        user_id: ID of the authenticated user
        search: Keyword to search in title or description (case-insensitive)
        status: Filter by status ('all', 'pending', 'completed')
        priority: Filter by priority ('high', 'medium', 'low')
        sort_by: Sort by field ('created', 'due_date', 'priority', 'title')
        order: Sort order ('asc', 'desc')
        skip: Number of records to skip for pagination
        limit: Maximum number of records to return

    Returns:
        A SQLModel select query object ready for execution
    """
    # Start with a base query filtered by the current user
    query = select(Task).where(Task.user_id == user_id)

    # Apply search filter if provided (case-insensitive keyword search on title/description)
    if search:
        query = query.where(
            or_(
                Task.title.ilike(f"%{search}%"),
                Task.description.ilike(f"%{search}%")
            )
        )

    # Apply status filter if provided
    # Note: The model uses "todo", "in_progress", "completed" as status values
    # Mapping "pending" to both "todo" and "in_progress" statuses
    if status and status != "all":
        if status == "pending":
            # Assuming "pending" means both "todo" and "in_progress" states
            query = query.where(Task.status.in_(["todo", "in_progress"]))
        elif status == "completed":
            query = query.where(Task.status == "completed")
        else:
            # Direct match for other status values
            query = query.where(Task.status == status)

    # Apply priority filter if provided
    if priority:
        query = query.where(Task.priority == priority)

    # Apply sorting with dynamic direction
    sort_column: Optional[ColumnElement] = None
    if sort_by == "due_date":
        sort_column = Task.due_date
    elif sort_by == "priority":
        sort_column = Task.priority
    elif sort_by == "title":
        sort_column = Task.title
    elif sort_by == "created":  # Map "created" to "created_at"
        sort_column = Task.created_at

    # Apply the sort with dynamic direction
    if sort_column is not None:
        if order.lower() == "desc":
            query = query.order_by(desc(sort_column))
        else:
            query = query.order_by(asc(sort_column))

    # Apply pagination
    query = query.offset(skip).limit(limit)

    return query


def get_filtered_tasks(
    session: Session,
    user_id: str,
    search: Optional[str] = None,
    status: Optional[str] = "all",
    priority: Optional[str] = None,
    sort_by: Optional[str] = "created",
    order: Optional[str] = "asc",
    skip: int = 0,
    limit: int = 100
) -> list:
    """
    Execute the dynamic query and return the filtered tasks.

    Args:
        session: Database session
        user_id: ID of the authenticated user
        search: Keyword to search in title or description (case-insensitive)
        status: Filter by status ('all', 'pending', 'completed')
        priority: Filter by priority ('high', 'medium', 'low')
        sort_by: Sort by field ('created', 'due_date', 'priority', 'title')
        order: Sort order ('asc', 'desc')
        skip: Number of records to skip for pagination
        limit: Maximum number of records to return

    Returns:
        List of Task objects matching the criteria
    """
    query = build_tasks_query(
        session=session,
        user_id=user_id,
        search=search,
        status=status,
        priority=priority,
        sort_by=sort_by,
        order=order,
        skip=skip,
        limit=limit
    )

    return session.exec(query).all()


@router.get("/tasks", response_model=List[Task])
def get_tasks(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = Query(None, description="Keyword to search in title or description (case-insensitive)"),
    status: Optional[str] = Query("all", description="Filter by status: 'all', 'pending', or 'completed'"),
    priority: Optional[str] = Query(None, description="Filter by priority: 'high', 'medium', or 'low'"),
    sort_by: Optional[str] = Query("created", description="Sort by field: 'created', 'due_date', 'priority', or 'title'"),
    order: Optional[str] = Query("asc", description="Sort order: 'asc' or 'desc'")
):
    """
    Get all tasks for the current user with optional filtering and sorting.
    """
    tasks = get_filtered_tasks(
        session=session,
        user_id=current_user.id,
        search=search,
        status=status,
        priority=priority,
        sort_by=sort_by,
        order=order,
        skip=skip,
        limit=limit
    )
    return tasks

@router.get("/tasks/{task_id}", response_model=Task)
def get_task(
    task_id: str,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Get a specific task by ID for the current user.
    """
    task = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    ).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return task

@router.post("/tasks", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_task(
    task: Task,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Create a new task for the current user.
    """
    # Ensure the task is assigned to the current user
    task.user_id = current_user.id
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.put("/tasks/{task_id}", response_model=Task)
def update_task(
    task_id: str,
    task_update: Task,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Update a specific task for the current user.
    """
    # Retrieve the existing task
    existing_task = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    ).first()

    if not existing_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Update the task with the provided data
    for var, value in task_update.dict(exclude_unset=True).items():
        setattr(existing_task, var, value)

    session.add(existing_task)
    session.commit()
    session.refresh(existing_task)
    return existing_task

@router.delete("/tasks/{task_id}", status_code=status.HTTP_200_OK)
def delete_task(
    task_id: str,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Delete a specific task for the current user.
    """
    task = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    ).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    session.delete(task)
    session.commit()
    return {"message": "Task deleted successfully"}

@router.patch("/tasks/{task_id}/complete", response_model=Task)
def complete_task(
    task_id: str,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """
    Toggle the completion status of a specific task for the current user.
    """
    # Retrieve the existing task
    existing_task = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    ).first()

    if not existing_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Toggle the status between 'completed' and 'todo'
    if existing_task.status == "completed":
        existing_task.status = "todo"
    else:
        existing_task.status = "completed"

    # Update the updated_at timestamp
    existing_task.updated_at = datetime.utcnow()

    session.add(existing_task)
    session.commit()
    session.refresh(existing_task)
    return existing_task