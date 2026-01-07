"""
Business logic manager for the Todo application.
"""
from typing import List, Optional
from .models import Task


class TodoManager:
    """
    Manages the collection of Task objects.

    Responsibilities:
    - Maintain collection of Task objects
    - Handle ID generation and uniqueness
    - Implement all business operations (add, delete, update, mark complete, view)
    - Validate inputs and handle errors appropriately
    """

    def __init__(self):
        """Initialize the TodoManager with an empty list of tasks and ID counter."""
        self._tasks: List[Task] = []
        self.next_id: int = 1

    def _get_next_id(self) -> int:
        """
        Get the next available ID for a new task.

        Returns:
            int: The next available ID
        """
        current_id = self.next_id
        self.next_id += 1
        return current_id

    def add_task(self, title: str, description: str = "") -> str:
        """
        Add a new task to the list.

        Args:
            title (str): Required task title, 1-200 characters
            description (str): Optional task description, up to 500 characters

        Returns:
            str: Success or error message
        """
        # Validate title is not empty
        if not title or not title.strip():
            return "Error: Title is required and cannot be empty."

        # Validate title length (1-200 characters)
        if len(title) < 1 or len(title) > 200:
            return "Error: Title must be between 1 and 200 characters."

        # Validate description length (≤500 characters)
        if len(description) > 500:
            return "Error: Description must be 500 characters or less."

        # Create new task with next available ID
        new_id = self._get_next_id()
        new_task = Task(id=new_id, title=title.strip(), description=description.strip(), completed=False)
        self._tasks.append(new_task)

        return f"Task '{title}' added successfully with ID {new_id}."

    def get_all_tasks(self) -> List[Task]:
        """
        Get all tasks in the list.

        Returns:
            List[Task]: List of all tasks
        """
        return self._tasks.copy()  # Return a copy to prevent external modification

    def update_task(self, task_id: int, title: str, description: str = "") -> str:
        """
        Update an existing task.

        Args:
            task_id (int): ID of the task to update
            title (str): New task title, 1-200 characters
            description (str): New task description, up to 500 characters

        Returns:
            str: Success or error message
        """
        # Find the task with the given ID
        task_index = None
        for i, task in enumerate(self._tasks):
            if task.id == task_id:
                task_index = i
                break

        # Check if task exists
        if task_index is None:
            return f"Error: Task with ID {task_id} not found."

        # Validate title is not empty
        if not title or not title.strip():
            return "Error: Title is required and cannot be empty."

        # Validate title length (1-200 characters)
        if len(title) < 1 or len(title) > 200:
            return "Error: Title must be between 1 and 200 characters."

        # Validate description length (≤500 characters)
        if len(description) > 500:
            return "Error: Description must be 500 characters or less."

        # Update the task
        self._tasks[task_index].title = title.strip()
        self._tasks[task_index].description = description.strip()

        return f"Task with ID {task_id} updated successfully."

    def delete_task(self, task_id: int) -> str:
        """
        Delete a task by its ID.

        Args:
            task_id (int): ID of the task to delete

        Returns:
            str: Success or error message
        """
        # Find the task with the given ID
        task_index = None
        for i, task in enumerate(self._tasks):
            if task.id == task_id:
                task_index = i
                break

        # Check if task exists
        if task_index is None:
            return f"Error: Task with ID {task_id} not found."

        # Remove the task
        deleted_task = self._tasks.pop(task_index)
        return f"Task '{deleted_task.title}' with ID {task_id} deleted successfully."

    def mark_complete(self, task_id: int) -> str:
        """
        Mark a task as complete/incomplete by toggling its status.

        Args:
            task_id (int): ID of the task to mark

        Returns:
            str: Success or error message
        """
        # Find the task with the given ID
        task_index = None
        for i, task in enumerate(self._tasks):
            if task.id == task_id:
                task_index = i
                break

        # Check if task exists
        if task_index is None:
            return f"Error: Task with ID {task_id} not found."

        # Toggle the completed status
        self._tasks[task_index].completed = not self._tasks[task_index].completed
        new_status = "completed" if self._tasks[task_index].completed else "pending"

        return f"Task '{self._tasks[task_index].title}' marked as {new_status}."