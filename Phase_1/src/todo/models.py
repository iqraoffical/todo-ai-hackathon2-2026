"""
Data models for the Todo application.
"""
from dataclasses import dataclass
from typing import List


@dataclass
class Task:
    """
    Represents a single todo task.
    
    Attributes:
        id (int): Unique identifier, auto-incremented starting from 1
        title (str): Required task title, 1-200 characters
        description (str): Optional task description, up to 500 characters
        completed (bool): Status indicator, defaults to False
    """
    id: int
    title: str
    description: str = ""
    completed: bool = False