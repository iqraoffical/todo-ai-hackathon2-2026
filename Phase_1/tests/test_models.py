"""
Unit tests for the Task dataclass.
"""
import unittest
from src.todo.models import Task


class TestTask(unittest.TestCase):
    """Test cases for the Task dataclass."""

    def test_task_creation(self):
        """Test creating a Task with valid parameters."""
        task = Task(id=1, title="Test Task", description="Test Description", completed=False)
        
        self.assertEqual(task.id, 1)
        self.assertEqual(task.title, "Test Task")
        self.assertEqual(task.description, "Test Description")
        self.assertEqual(task.completed, False)

    def test_task_creation_defaults(self):
        """Test creating a Task with default values."""
        task = Task(id=1, title="Test Task")
        
        self.assertEqual(task.id, 1)
        self.assertEqual(task.title, "Test Task")
        self.assertEqual(task.description, "")
        self.assertEqual(task.completed, False)

    def test_task_modification(self):
        """Test modifying Task attributes."""
        task = Task(id=1, title="Test Task", description="Test Description", completed=False)
        
        task.title = "Updated Task"
        task.completed = True
        
        self.assertEqual(task.title, "Updated Task")
        self.assertEqual(task.completed, True)


if __name__ == "__main__":
    unittest.main()