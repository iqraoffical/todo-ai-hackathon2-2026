# In-Memory Python Todo Console App

This project implements a simple console-based todo application in Python with in-memory storage. The application follows the principles outlined in the project constitution (`.specify/memory/constitution.md`), emphasizing clean code with type hints, proper error handling, standard library dependencies only, and Python best practices.

## Features

- Add new todo items
- Delete existing todo items
- Update todo item details
- View all todo items
- Mark todo items as complete

## Architecture

The application is structured with:
- A `Task` class for individual todo items
- A `TodoManager` class for managing the collection of tasks
- CLI interface for user interaction
- In-memory storage using a list of Task objects

## Development

This project follows the principles in `.specify/memory/constitution.md` which include:
- Clean code with type hints and modular classes
- Proper error handling and validation
- No external dependencies except standard library
- Python best practices (PEP8) and proper project structure
- Testable CLI interface