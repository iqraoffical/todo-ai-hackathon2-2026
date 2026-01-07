# Quickstart Guide: Todo CLI App

## Getting Started

1. Ensure you have Python 3.8+ installed on your system
2. Clone or download the repository
3. Navigate to the project directory
4. Run the application with: `python -m src.todo.main`

## Using the Application

The application presents a menu-driven interface:

```
Todo List Application
1. Add Task
2. View Tasks
3. Update Task
4. Delete Task
5. Mark Complete
6. Exit
```

### Adding a Task
1. Select option 1
2. Enter the task title (required, 1-200 characters)
3. Optionally enter a description (up to 500 characters)
4. The task will be added with a unique ID and "pending" status

### Viewing Tasks
1. Select option 2
2. All tasks will be displayed in a formatted table showing ID, Title, Description, and Status

### Updating a Task
1. Select option 3
2. Enter the ID of the task you want to update
3. Enter the new title (required)
4. Optionally enter a new description or press Enter to keep the current one

### Deleting a Task
1. Select option 4
2. Enter the ID of the task you want to delete
3. The task will be removed from the list

### Marking a Task Complete
1. Select option 5
2. Enter the ID of the task you want to mark
3. The task status will toggle between "pending" and "completed"

### Exiting
1. Select option 6
2. The application will terminate (all data will be lost as it's in-memory only)

## Error Handling

The application provides clear error messages for:
- Invalid task IDs
- Empty or invalid titles
- Too-long titles or descriptions
- Invalid menu choices

## Development

To run the tests:
```
python -m pytest tests/
```

The code follows PEP8 standards and includes type hints throughout.