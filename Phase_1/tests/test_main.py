"""
Integration tests for the CLI flow.
"""
import unittest
from unittest.mock import patch, MagicMock
from io import StringIO
import sys
from src.todo.manager import TodoManager


class TestCLIFlow(unittest.TestCase):
    """Integration tests for the CLI flow."""

    def setUp(self):
        """Set up a fresh TodoManager instance for each test."""
        self.manager = TodoManager()

    @patch('builtins.input')
    @patch('sys.stdout', new_callable=StringIO)
    def test_add_task_flow(self, mock_stdout, mock_input):
        """Test the add task flow through the CLI."""
        # Simulate user input for adding a task
        mock_input.side_effect = ["1", "Test Task", "Test Description", "6"]  # 6 to exit
        
        # Capture the result of adding a task
        result = self.manager.add_task("Test Task", "Test Description")
        
        # Verify the task was added successfully
        tasks = self.manager.get_all_tasks()
        self.assertEqual(len(tasks), 1)
        self.assertEqual(tasks[0].title, "Test Task")
        self.assertEqual(tasks[0].description, "Test Description")
        self.assertIn("added successfully", result)

    @patch('builtins.input')
    @patch('sys.stdout', new_callable=StringIO)
    def test_view_tasks_flow(self, mock_stdout, mock_input):
        """Test the view tasks flow through the CLI."""
        # Add a task first
        self.manager.add_task("Test Task", "Test Description")
        
        # Simulate user input for viewing tasks
        mock_input.side_effect = ["2", "6"]  # 6 to exit
        
        tasks = self.manager.get_all_tasks()
        
        # Verify the task is in the list
        self.assertEqual(len(tasks), 1)
        self.assertEqual(tasks[0].title, "Test Task")

    @patch('builtins.input')
    @patch('sys.stdout', new_callable=StringIO)
    def test_update_task_flow(self, mock_stdout, mock_input):
        """Test the update task flow through the CLI."""
        # Add a task first
        self.manager.add_task("Original Task", "Original Description")
        original_task = self.manager.get_all_tasks()[0]
        task_id = original_task.id
        
        # Simulate user input for updating the task
        mock_input.side_effect = ["3", str(task_id), "Updated Task", "Updated Description", "6"]  # 6 to exit
        
        # Update the task
        result = self.manager.update_task(task_id, "Updated Task", "Updated Description")
        
        # Verify the task was updated successfully
        updated_tasks = self.manager.get_all_tasks()
        self.assertEqual(len(updated_tasks), 1)
        self.assertEqual(updated_tasks[0].title, "Updated Task")
        self.assertEqual(updated_tasks[0].description, "Updated Description")
        self.assertIn("updated successfully", result)

    @patch('builtins.input')
    @patch('sys.stdout', new_callable=StringIO)
    def test_delete_task_flow(self, mock_stdout, mock_input):
        """Test the delete task flow through the CLI."""
        # Add a task first
        self.manager.add_task("Task to Delete", "Description")
        task_to_delete = self.manager.get_all_tasks()[0]
        task_id = task_to_delete.id
        
        # Simulate user input for deleting the task
        mock_input.side_effect = ["4", str(task_id), "6"]  # 6 to exit
        
        # Delete the task
        result = self.manager.delete_task(task_id)
        
        # Verify the task was deleted
        tasks = self.manager.get_all_tasks()
        self.assertEqual(len(tasks), 0)
        self.assertIn("deleted successfully", result)

    @patch('builtins.input')
    @patch('sys.stdout', new_callable=StringIO)
    def test_mark_complete_flow(self, mock_stdout, mock_input):
        """Test the mark complete flow through the CLI."""
        # Add a task first
        self.manager.add_task("Task to Complete", "Description")
        task_to_complete = self.manager.get_all_tasks()[0]
        task_id = task_to_complete.id
        
        # Verify it's initially incomplete
        self.assertFalse(task_to_complete.completed)
        
        # Simulate user input for marking complete
        mock_input.side_effect = ["5", str(task_id), "6"]  # 6 to exit
        
        # Mark the task as complete
        result = self.manager.mark_complete(task_id)
        
        # Verify the task is now complete
        updated_tasks = self.manager.get_all_tasks()
        self.assertTrue(updated_tasks[0].completed)
        self.assertIn("marked as completed", result)

    def test_error_handling_for_invalid_ids(self):
        """Test error handling for invalid task IDs."""
        # Test update with invalid ID
        update_result = self.manager.update_task(999, "New Title", "New Description")
        self.assertIn("Error: Task with ID 999 not found", update_result)
        
        # Test delete with invalid ID
        delete_result = self.manager.delete_task(999)
        self.assertIn("Error: Task with ID 999 not found", delete_result)
        
        # Test mark complete with invalid ID
        mark_result = self.manager.mark_complete(999)
        self.assertIn("Error: Task with ID 999 not found", mark_result)

    def test_validation_in_manager_methods(self):
        """Test validation in manager methods."""
        # Test adding task with empty title
        empty_title_result = self.manager.add_task("", "Description")
        self.assertIn("Error: Title is required", empty_title_result)
        
        # Test adding task with title too long
        long_title_result = self.manager.add_task("A" * 201, "Description")
        self.assertIn("Error: Title must be between 1 and 200 characters", long_title_result)
        
        # Test adding task with description too long
        long_desc_result = self.manager.add_task("Title", "A" * 501)
        self.assertIn("Error: Description must be 500 characters or less", long_desc_result)
        
        # Test updating task with empty title
        self.manager.add_task("Original", "Description")
        original_task = self.manager.get_all_tasks()[0]
        update_empty_result = self.manager.update_task(original_task.id, "", "New Description")
        self.assertIn("Error: Title is required", update_empty_result)


if __name__ == "__main__":
    unittest.main()