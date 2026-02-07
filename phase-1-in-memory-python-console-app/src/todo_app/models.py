"""
Task Data Model

This module defines the Task dataclass with all required attributes and validation.
"""
from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class Task:
    """
    Represents a todo task with required attributes and validation.

    Attributes:
        id: Unique auto-incremented identifier
        title: Task title (required, non-empty validation)
        description: Task description (optional, can be empty)
        completed: Completion status (default: False)
        created_at: Timestamp of creation
    """
    id: int
    title: str
    description: str = ""
    completed: bool = False
    created_at: Optional[datetime] = None

    def __post_init__(self):
        """Validate attributes after initialization."""
        if self.created_at is None:
            self.created_at = datetime.now()

        # Validate title is not empty or whitespace only
        if not self.title or not self.title.strip():
            raise ValueError("Task title cannot be empty or contain only whitespace")