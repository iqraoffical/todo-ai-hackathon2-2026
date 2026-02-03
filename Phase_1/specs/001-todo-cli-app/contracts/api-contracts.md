# Todo CLI App - API Contracts

## Overview
This document describes the functional contracts for the Todo CLI application. Since this is a console application, these represent the functional interfaces rather than HTTP APIs.

## Core Operations

### Add Task
- **Input**: title (str, 1-200 chars), description (str, optional, 0-500 chars)
- **Output**: Task object with ID, title, description, completed=False
- **Errors**: ValueError if title doesn't meet validation requirements
- **Side Effects**: New task added to the task list with auto-generated ID

### View Tasks
- **Input**: None
- **Output**: List of Task objects with all properties
- **Errors**: None
- **Side Effects**: None

### Update Task
- **Input**: task_id (int), new_title (str, 1-200 chars), new_description (str, optional, 0-500 chars)
- **Output**: Updated Task object
- **Errors**: ValueError if task_id doesn't exist or title doesn't meet validation
- **Side Effects**: Task properties updated in the task list

### Delete Task
- **Input**: task_id (int)
- **Output**: Boolean indicating success
- **Errors**: ValueError if task_id doesn't exist
- **Side Effects**: Task removed from the task list (ID remains reserved to maintain ID stability)

### Mark Complete
- **Input**: task_id (int)
- **Output**: Updated Task object with toggled completed status
- **Errors**: ValueError if task_id doesn't exist
- **Side Effects**: Task's completed status toggled in the task list