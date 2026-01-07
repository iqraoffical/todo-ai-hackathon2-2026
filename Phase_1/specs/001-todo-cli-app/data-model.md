# Data Model: Todo CLI App

## Task Entity

### Fields
- `id: int` - Unique identifier, auto-incremented starting from 1
- `title: str` - Required task title, 1-200 characters
- `description: str` - Optional task description, up to 500 characters
- `completed: bool` - Status indicator, default False

### Validation Rules
- Title must be 1-200 characters (non-empty)
- Description must be 0-500 characters if provided
- ID must be unique within the system
- Completed status defaults to False when creating new tasks

### State Transitions
- `pending` → `completed` when mark_complete() is called on an incomplete task
- `completed` → `pending` when mark_complete() is called on a completed task

## TodoManager Entity

### Responsibilities
- Maintain collection of Task objects
- Handle ID generation and uniqueness
- Implement all business operations (add, delete, update, mark complete, view)
- Validate inputs and handle errors appropriately

### Relationships
- Contains 0 to many Task objects
- Each Task object belongs to exactly one TodoManager instance