# Implementation Plan: Todo CLI App

**Branch**: `001-todo-cli-app` | **Date**: 2026-01-02 | **Spec**: [link]
**Input**: Feature specification from `/specs/001-todo-cli-app/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implementation of a complete in-memory Python Todo console application with CLI interface. The application will follow a modular architecture with a Task dataclass for individual items and a TodoManager class for operations. The CLI will provide a menu-driven interface for all 5 core features: Add, View, Update, Delete, and Mark Complete tasks.

## Technical Context

**Language/Version**: Python 3.8+
**Primary Dependencies**: Standard library only (no external dependencies)
**Storage**: In-memory using list of Task objects
**Testing**: Python unittest module
**Target Platform**: Cross-platform console application
**Project Type**: Single project with modular structure
**Performance Goals**: Instant response for all operations (sub 100ms)
**Constraints**: <100MB memory usage, offline-capable, no persistence
**Scale/Scope**: Single user, up to 10,000 tasks

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean code with type hints and modular classes (Task class, TodoManager class) ✅
- Proper error handling and validation ✅
- No external dependencies except standard library ✅
- Follow Python best practices (PEP8) and proper project structure with src/ folder ✅
- All features must be testable via CLI ✅
- Use list of Task objects for in-memory storage ✅
- Modular functions for each feature in separate modules where appropriate ✅
- Error messages clear and user-friendly ✅
- In-memory only (no persistence) ✅
- CLI interface with simple command parsing ✅
- Features: Add, Delete, Update, View, Mark Complete ✅

## Project Structure

### Documentation (this feature)

```text
specs/001-todo-cli-app/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
src/
├── todo/
│   ├── __init__.py
│   ├── models.py        # Task dataclass
│   ├── manager.py       # TodoManager class with all operations
│   └── main.py          # CLI loop and menu
└── tests/               # Unit and integration tests
    ├── test_models.py
    ├── test_manager.py
    └── test_main.py

```

**Structure Decision**: Single project with modular structure following the requirements. The application is organized in the src/todo/ directory with separate modules for models, business logic (manager), and main application logic (CLI interface).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

## Architecture Design

### High-Level Architecture

The application follows a modular architecture with clear separation of concerns:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   CLI Layer     │    │  Business Logic  │    │   Data Layer    │
│   (main.py)     │───▶│  (manager.py)    │───▶│  (models.py)    │
│                 │    │                  │    │                 │
│ - Menu display  │    │ - Task operations│    │ - Task data    │
│ - Input parsing │    │ - Validation     │    │   structure    │
│ - User prompts  │    │ - Error handling │    │ - Type hints   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Core Components

1. **Task Dataclass** (`src/todo/models.py`):
   - `id: int` - Unique identifier, auto-incremented starting from 1
   - `title: str` - Required title (1-200 characters)
   - `description: str` - Optional description (up to 500 characters)
   - `completed: bool` - Status indicator, defaults to False

2. **TodoManager Class** (`src/todo/manager.py`):
   - Private list `_tasks: List[Task]` for in-memory storage
   - `next_id: int` for incremental ID generation
   - Methods for all 5 core operations with proper validation
   - Error handling with user-friendly messages

3. **Main CLI Application** (`src/todo/main.py`):
   - Simple infinite loop with numbered menu options
   - Input handling with if-elif statements
   - Single TodoManager instance for all operations

## Implementation Strategy

### 1. Task Dataclass Implementation

Create a `Task` dataclass in `src/todo/models.py` with:
- Type hints for all fields
- Default value for `completed` field (False)
- Proper validation for title and description lengths

### 2. TodoManager Class Implementation

Create a `TodoManager` class in `src/todo/manager.py` with:
- Private list `_tasks` to store Task objects
- `next_id` attribute for auto-incrementing IDs
- Methods corresponding to each feature:
  - `add_task(title: str, description: str = "") -> str`
  - `get_all_tasks() -> List[Task]`
  - `update_task(task_id: int, title: str, description: str) -> str`
  - `delete_task(task_id: int) -> str`
  - `mark_complete(task_id: int) -> str`
- Proper validation and error handling in each method
- User-friendly success/error messages

### 3. Main CLI Application

Create the main application in `src/todo/main.py` with:
- Menu display showing options 1-6
- Input parsing for user selection
- Calls to TodoManager methods based on user choice
- Proper error handling for invalid inputs
- Loop continues until user selects "Exit"

## Feature-to-Method Mapping

| Feature | Menu Option | TodoManager Method | Validation Required |
|---------|-------------|-------------------|-------------------|
| Add Task | Option 1 | `add_task(title, description)` | Title: 1-200 chars, non-empty; Description: ≤500 chars |
| View Tasks | Option 2 | `get_all_tasks()` | None |
| Update Task | Option 3 | `update_task(id, title, description)` | ID: exists in list; Title: 1-200 chars, non-empty |
| Delete Task | Option 4 | `delete_task(id)` | ID: exists in list |
| Mark Complete | Option 5 | `mark_complete(id)` | ID: exists in list |
| Exit | Option 6 | Exit loop | None |

## ID Management Strategy

- IDs start from 1 and increment sequentially
- IDs remain stable after deletion (no renumbering)
- `TodoManager` maintains a `next_id` counter
- When adding a new task, assign current `next_id` and increment counter
- Deletion doesn't affect ID assignment for future tasks

## Error Handling Strategy

- Each method in TodoManager returns appropriate success/error messages
- Input validation occurs at both CLI and manager levels
- Clear, user-friendly error messages for invalid inputs
- Graceful handling of edge cases (empty list, invalid IDs, etc.)
- Type validation for all inputs (especially ID as integer)

## Testing Approach

- Unit tests for Task dataclass in `tests/test_models.py`
- Unit tests for TodoManager methods in `tests/test_manager.py`
- Integration tests for CLI flow in `tests/test_main.py`
- Test all validation scenarios and error conditions
- Test edge cases like empty lists, invalid IDs, etc.

## Implementation Phases

### Phase 1: Core Data Model
- Implement Task dataclass with proper validation
- Create basic TodoManager class structure

### Phase 2: Business Logic
- Implement all TodoManager methods with validation
- Add error handling and user-friendly messages

### Phase 3: CLI Interface
- Create main CLI loop with menu options
- Connect CLI to TodoManager methods
- Add input validation and error handling

### Phase 4: Testing and Refinement
- Write comprehensive unit tests
- Test all features and edge cases
- Refine error messages and user experience