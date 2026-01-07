"""
Unit tests for the TodoManager class.
"""
import unittest
from src.todo.manager import TodoManager


class TestTodoManager(unittest.TestCase):
    """Test cases for the TodoManager class."""

    def setUp(self):
        """Set up a fresh TodoManager instance for each test."""
        self.manager = TodoManager()

    def test_add_task_success(self):
        """Test adding a task successfully."""
        result = self.manager.add_task("Test Task", "Test Description")
        
        self.assertEqual(len(self.manager.get_all_tasks()), 1)
        self.assertIn("added successfully", result)
        self.assertEqual(self.manager.get_all_tasks()[0].title, "Test Task")
        self.assertEqual(self.manager.get_all_tasks()[0].description, "Test Description")
        self.assertEqual(self.manager.get_all_tasks()[0].completed, False)

    def test_add_task_empty_title(self):
        """Test adding a task with an empty title."""
        result = self.manager.add_task("", "Test Description")
        
        self.assertEqual(len(self.manager.get_all_tasks()), 0)
        self.assertIn("Error: Title is required", result)

    def test_add_task_whitespace_title(self):
        """Test adding a task with a whitespace-only title."""
        result = self.manager.add_task("   ", "Test Description")
        
        self.assertEqual(len(self.manager.get_all_tasks()), 0)
        self.assertIn("Error: Title is required", result)

    def test_add_task_title_too_long(self):
        """Test adding a task with a title that is too long."""
        long_title = "A" * 201
        result = self.manager.add_task(long_title, "Test Description")
        
        self.assertEqual(len(self.manager.get_all_tasks()), 0)
        self.assertIn("Error: Title must be between 1 and 200 characters", result)

    def test_add_task_description_too_long(self):
        """Test adding a task with a description that is too long."""
        long_description = "A" * 501
        result = self.manager.add_task("Test Task", long_description)
        
        self.assertEqual(len(self.manager.get_all_tasks()), 0)
        self.assertIn("Error: Description must be 500 characters or less", result)

    def test_get_all_tasks_empty(self):
        """Test getting all tasks when the list is empty."""
        tasks = self.manager.get_all_tasks()
        
        self.assertEqual(len(tasks), 0)

    def test_get_all_tasks_with_items(self):
        """Test getting all tasks when the list has items."""
        self.manager.add_task("Task 1", "Description 1")
        self.manager.add_task("Task 2", "Description 2")
        
        tasks = self.manager.get_all_tasks()
        
        self.assertEqual(len(tasks), 2)
        self.assertEqual(tasks[0].title, "Task 1")
        self.assertEqual(tasks[1].title, "Task 2")

    def test_update_task_success(self):
        """Test updating a task successfully."""
        self.manager.add_task("Original Task", "Original Description")
        original_task = self.manager.get_all_tasks()[0]
        task_id = original_task.id
        
        result = self.manager.update_task(task_id, "Updated Task", "Updated Description")
        
        updated_tasks = self.manager.get_all_tasks()
        self.assertEqual(len(updated_tasks), 1)
        self.assertIn("updated successfully", result)
        self.assertEqual(updated_tasks[0].title, "Updated Task")
        self.assertEqual(updated_tasks[0].description, "Updated Description")

    def test_update_task_not_found(self):
        """Test updating a task that doesn't exist."""
        result = self.manager.update_task(999, "Updated Task", "Updated Description")
        
        self.assertIn("Error: Task with ID 999 not found", result)

    def test_update_task_empty_title(self):
        """Test updating a task with an empty title."""
        self.manager.add_task("Original Task", "Original Description")
        original_task = self.manager.get_all_tasks()[0]
        task_id = original_task.id
        
        result = self.manager.update_task(task_id, "", "Updated Description")
        
        self.assertIn("Error: Title is required", result)
        # Ensure the original task is unchanged
        tasks = self.manager.get_all_tasks()
        self.assertEqual(tasks[0].title, "Original Task")

    def test_update_task_title_too_long(self):
        """Test updating a task with a title that is too long."""
        self.manager.add_task("Original Task", "Original Description")
        original_task = self.manager.get_all_tasks()[0]
        task_id = original_task.id
        
        long_title = "A" * 201
        result = self.manager.update_task(task_id, long_title, "Updated Description")
        
        self.assertIn("Error: Title must be between 1 and 200 characters", result)
        # Ensure the original task is unchanged
        tasks = self.manager.get_all_tasks()
        self.assertEqual(tasks[0].title, "Original Task")

    def test_delete_task_success(self):
        """Test deleting a task successfully."""
        self.manager.add_task("Task to Delete", "Description")
        task_to_delete = self.manager.get_all_tasks()[0]
        task_id = task_to_delete.id
        
        result = self.manager.delete_task(task_id)
        
        self.assertIn("deleted successfully", result)
        self.assertEqual(len(self.manager.get_all_tasks()), 0)

    def test_delete_task_not_found(self):
        """Test deleting a task that doesn't exist."""
        result = self.manager.delete_task(999)
        
        self.assertIn("Error: Task with ID 999 not found", result)

    def test_mark_complete_success(self):
        """Test marking a task as complete successfully."""
        self.manager.add_task("Task to Complete", "Description")
        task_to_complete = self.manager.get_all_tasks()[0]
        task_id = task_to_complete.id
        
        # Initially should be incomplete
        self.assertFalse(task_to_complete.completed)
        
        result = self.manager.mark_complete(task_id)
        
        self.assertIn("marked as completed", result)
        updated_tasks = self.manager.get_all_tasks()
        self.assertTrue(updated_tasks[0].completed)

    def test_mark_complete_toggle(self):
        """Test toggling a task's completion status."""
        self.manager.add_task("Task to Toggle", "Description")
        task_to_toggle = self.manager.get_all_tasks()[0]
        task_id = task_to_toggle.id
        
        # Mark as complete
        self.manager.mark_complete(task_id)
        tasks_after_first_toggle = self.manager.get_all_tasks()
        self.assertTrue(tasks_after_first_toggle[0].completed)
        
        # Mark as incomplete again
        result = self.manager.mark_complete(task_id)
        
        self.assertIn("marked as pending", result)
        tasks_after_second_toggle = self.manager.get_all_tasks()
        self.assertFalse(tasks_after_second_toggle[0].completed)

    def test_mark_complete_not_found(self):
        """Test marking a task as complete that doesn't exist."""
        result = self.manager.mark_complete(999)
        
        self.assertIn("Error: Task with ID 999 not found", result)

    def test_id_generation(self):
        """Test that IDs are generated sequentially."""
        self.manager.add_task("Task 1", "Description 1")
        self.manager.add_task("Task 2", "Description 2")
        self.manager.add_task("Task 3", "Description 3")
        
        tasks = self.manager.get_all_tasks()
        self.assertEqual(tasks[0].id, 1)
        self.assertEqual(tasks[1].id, 2)
        self.assertEqual(tasks[2].id, 3)

    def test_id_stability_after_deletion(self):
        """Test that IDs remain stable after deletion."""
        self.manager.add_task("Task 1", "Description 1")
        self.manager.add_task("Task 2", "Description 2")
        self.manager.add_task("Task 3", "Description 3")
        
        # Delete the middle task
        self.manager.delete_task(2)
        
        # Add a new task - it should get ID 4, not reusing ID 2
        self.manager.add_task("Task 4", "Description 4")
        
        tasks = self.manager.get_all_tasks()
        task_ids = [task.id for task in tasks]
        self.assertIn(1, task_ids)
        self.assertNotIn(2, task_ids)  # ID 2 should not be reused
        self.assertIn(3, task_ids)
        self.assertIn(4, task_ids)  # New task should get ID 4


if __name__ == "__main__":
    unittest.main()