# Implementation Tasks: Todo CLI App

**Feature**: Todo CLI App | **Date**: 2026-01-02 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-todo-cli-app/spec.md`

**Note**: This template is filled in by the `/sp.tasks` command. See `.specify/templates/commands/tasks.md` for the execution workflow.

## Summary

Implementation of a complete in-memory Python Todo console application with CLI interface. The application will follow a modular architecture with a Task dataclass for individual items and a TodoManager class for operations. The CLI will provide a menu-driven interface for all 5 core features: Add, View, Update, Delete, and Mark Complete tasks.

## Dependencies

**User Story Completion Order**:
- US1 (Add Task) → No dependencies
- US2 (View Tasks) → No dependencies
- US3 (Update Task) → US1 (requires existing tasks to update)
- US4 (Delete Task) → US1 (requires existing tasks to delete)
- US5 (Mark Complete) → US1 (requires existing tasks to mark complete)

**Parallel Execution Examples**:
- T004-T006 (Foundational tasks) can run in parallel with different files
- T044-T046 (Testing tasks) can run in parallel after core functionality is implemented

## Implementation Strategy

**MVP Scope**: Implement User Story 1 (Add Task) with minimal viable functionality - basic CLI menu, Task dataclass, and add_task functionality with validation.

**Incremental Delivery**: Each user story phase delivers a complete, independently testable increment of functionality.

## Phase 1: Setup Tasks

**Goal**: Establish project structure and basic configuration

- [x] T001 Create project structure with src/todo and tests directories
- [x] T002 Create __init__.py files in src/todo and tests directories
- [x] T003 Set up basic project configuration files

## Phase 2: Foundational Tasks

**Goal**: Create core data models and business logic foundation

- [x] T004 [P] Create Task dataclass in src/todo/models.py with id, title, description, and completed fields
- [x] T005 [P] Create TodoManager class in src/todo/manager.py with basic structure
- [x] T006 [P] Implement ID generation mechanism in TodoManager

## Phase 3: [US1] Add Todo Item

**Goal**: Implement the foundational feature that allows users to create todo items

**Independent Test Criteria**: Can be fully tested by running the CLI app, entering the add command, providing a title and optional description, and verifying that the new todo item appears in the list.

- [x] T007 [US1] Implement add_task method in TodoManager with validation
- [x] T008 [US1] Add error handling for empty titles in add_task method
- [x] T009 [US1] Add validation for title length (1-200 chars) in add_task method
- [x] T010 [US1] Add validation for description length (≤500 chars) in add_task method
- [x] T011 [US1] Create basic CLI loop in src/todo/main.py
- [x] T012 [US1] Implement menu option 1 for adding tasks
- [x] T013 [US1] Add user prompts for title and description in CLI
- [x] T014 [US1] Connect CLI add option to TodoManager add_task method

## Phase 4: [US2] View Todo List

**Goal**: Implement the core feature that allows users to see their tasks

**Independent Test Criteria**: Can be fully tested by running the CLI app, entering the view command, and verifying that all todo items are displayed with their ID, title, description, and status.

- [x] T015 [US2] Implement get_all_tasks method in TodoManager
- [x] T016 [US2] Implement formatted display for tasks in CLI
- [x] T017 [US2] Add proper formatting for ID, Title, Description, and Status
- [x] T018 [US2] Handle empty task list with friendly message
- [x] T019 [US2] Implement menu option 2 for viewing tasks
- [x] T020 [US2] Connect CLI view option to TodoManager get_all_tasks method

## Phase 5: [US3] Update Todo Item

**Goal**: Implement functionality to update the details of existing todo items

**Independent Test Criteria**: Can be fully tested by running the CLI app, entering the update command with a valid ID and new details, and verifying that the todo item is updated.

- [x] T021 [US3] Implement update_task method in TodoManager with validation
- [x] T022 [US3] Add ID validation to ensure task exists in update_task method
- [x] T023 [US3] Add validation for new title in update_task method
- [x] T024 [US3] Implement menu option 3 for updating tasks
- [x] T025 [US3] Add user prompts for task ID, new title, and new description
- [x] T026 [US3] Connect CLI update option to TodoManager update_task method

## Phase 6: [US4] Delete Todo Item

**Goal**: Implement functionality to delete todo items that are no longer needed

**Independent Test Criteria**: Can be fully tested by running the CLI app, entering the delete command with a valid ID, and verifying that the todo item is removed from the list.

- [x] T027 [US4] Implement delete_task method in TodoManager with validation
- [x] T028 [US4] Add ID validation to ensure task exists in delete_task method
- [x] T029 [US4] Implement menu option 4 for deleting tasks
- [x] T030 [US4] Add user prompts for task ID to delete
- [x] T031 [US4] Connect CLI delete option to TodoManager delete_task method

## Phase 7: [US5] Mark Todo Complete

**Goal**: Implement functionality to mark todo items as complete to track progress

**Independent Test Criteria**: Can be fully tested by running the CLI app, entering the mark complete command with a valid ID, and verifying that the todo item's status is toggled.

- [x] T032 [US5] Implement mark_complete method in TodoManager with validation
- [x] T033 [US5] Add ID validation to ensure task exists in mark_complete method
- [x] T034 [US5] Implement status toggling logic in mark_complete method
- [x] T035 [US5] Implement menu option 5 for marking tasks complete
- [x] T036 [US5] Add user prompts for task ID to mark complete
- [x] T037 [US5] Connect CLI mark complete option to TodoManager mark_complete method

## Phase 8: Polish & Cross-Cutting Concerns

**Goal**: Complete the application with proper error handling, user experience, and testing

- [x] T038 Implement menu option 6 for exiting the application
- [x] T039 Add comprehensive error handling throughout CLI
- [x] T040 Add proper input validation for all user inputs
- [x] T041 Ensure all methods return user-friendly messages
- [x] T042 Add type hints throughout the codebase
- [x] T043 Implement proper string truncation for long descriptions in view
- [x] T044 Write unit tests for Task dataclass in tests/test_models.py
- [x] T045 Write unit tests for TodoManager methods in tests/test_manager.py
- [x] T046 Write integration tests for CLI flow in tests/test_main.py
- [x] T047 Perform final code review and cleanup