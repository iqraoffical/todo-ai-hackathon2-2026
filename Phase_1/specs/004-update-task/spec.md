# Feature Specification: Update Task

**Feature Branch**: `004-update-task`
**Created**: 2026-01-01
**Status**: Draft
**Input**: User description: "Spec for Update Task feature: - Prompt user for task ID to update - Validate ID exists - If valid → ask user for new title (required, same validation as Add) and new description (optional) - Update the corresponding Task object fields - Show confirmation message after update - If ID invalid → show clear error message - Allow leaving description unchanged if user presses Enter"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Update Task with New Title and Description (Priority: P1)

As a user, I want to update an existing task by providing its ID and new title and description so that I can keep my task information current.

**Why this priority**: This is the core functionality of the update task feature, allowing users to modify existing tasks.

**Independent Test**: Can be fully tested by running the CLI app, entering the update command with a valid task ID, providing a new title and description, and verifying that the task is updated with the new information.

**Acceptance Scenarios**:

1. **Given** I have a list of tasks with valid IDs, **When** I enter the update command with a valid task ID and provide a new title and description, **Then** the task is updated with the new information and a confirmation message is displayed
2. **Given** I have a list of tasks, **When** I enter the update command with a valid task ID and provide a new title that meets validation requirements, **Then** the task title is updated while preserving the original description
3. **Given** I have a list of tasks, **When** I enter the update command with an invalid task ID, **Then** an error message is displayed indicating that the task was not found

---

### User Story 2 - Update Task Title Only (Priority: P2)

As a user, I want to update just the title of a task while keeping the description unchanged so that I can modify specific aspects of a task without losing other information.

**Why this priority**: This provides flexibility for users who only need to update specific fields of a task.

**Independent Test**: Can be fully tested by running the CLI app, entering the update command with a valid task ID, providing a new title, and pressing Enter to keep the description unchanged, then verifying that only the title was updated.

**Acceptance Scenarios**:

1. **Given** I have a task with a title and description, **When** I enter the update command with the task ID, provide a new title, and press Enter for the description, **Then** only the title is updated and the description remains unchanged
2. **Given** I have a task with a title and description, **When** I enter the update command with the task ID, provide a new title that fails validation, **Then** an error message is displayed and the task remains unchanged

---

### User Story 3 - Handle Invalid Input (Priority: P3)

As a user, I want to receive clear error messages when I enter invalid input so that I understand how to properly use the update task feature.

**Why this priority**: Proper error handling improves user experience by providing clear feedback when input doesn't meet requirements.

**Independent Test**: Can be fully tested by running the CLI app, entering the update command with various invalid inputs, and verifying that appropriate error messages are displayed.

**Acceptance Scenarios**:

1. **Given** I enter the update command with a non-numeric task ID, **When** I submit the command, **Then** an error message is displayed indicating that the ID must be numeric
2. **Given** I enter the update command with a valid task ID but provide a title that is empty, **When** I submit the command, **Then** an error message is displayed indicating that a title is required
3. **Given** I enter the update command with a valid task ID but provide a title that exceeds 200 characters, **When** I submit the command, **Then** an error message is displayed indicating that the title is too long

---

### Edge Cases

- What happens when the user enters a title with only whitespace characters?
- How does the system handle special characters in the title or description?
- What happens if the user enters a very long title or description that exceeds the validation limits?
- How does the system handle updating a task that has no description?
- What happens if the user enters a decimal number as an ID?
- How does the system handle updating a task with an ID that is at the boundary of valid range?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST prompt the user for a task ID to update
- **FR-002**: System MUST validate that the provided task ID exists in the task list
- **FR-003**: System MUST ask the user for a new title when the ID is valid
- **FR-004**: System MUST validate the new title with the same validation rules as the Add feature (1-200 characters, non-empty)
- **FR-005**: System MUST ask the user for a new description (optional)
- **FR-006**: System MUST update the corresponding Task object fields with the new title and description
- **FR-007**: System MUST show a confirmation message after the update is successful
- **FR-008**: System MUST show a clear error message if the task ID is invalid or not found
- **FR-009**: System MUST allow users to leave the description unchanged by pressing Enter
- **FR-010**: System MUST handle invalid inputs gracefully without crashing
- **FR-011**: System MUST preserve the original task ID after updating other fields

### Key Entities

- **Task**: Represents a single task with attributes: ID (unique identifier), title (required string, 1-200 characters), description (optional string, up to 500 characters), status (boolean)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully update task titles and descriptions with valid inputs without errors
- **SC-002**: The system correctly validates input and provides clear error messages for invalid inputs
- **SC-003**: After updating, the task retains its original ID and only the specified fields are changed
- **SC-004**: The update task functionality works reliably without crashes or unhandled exceptions
- **SC-005**: Users can update just the title while keeping the description unchanged
- **SC-006**: The confirmation message is displayed after successful updates