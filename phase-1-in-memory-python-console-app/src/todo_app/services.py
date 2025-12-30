"""
Task Services

This module implements the business logic for task management including
in-memory storage, auto-incrementing IDs, and all core operations.
"""
from typing import List, Optional
from .models import Task


class TaskManager:
    """
    Manages in-memory storage of tasks with auto-incrementing IDs.
    """

    def __init__(self):
        """Initialize the task manager with an empty task list and ID counter."""
        self._tasks: List[Task] = []
        self._next_id: int = 1

    def find_task_by_id(self, task_id: int) -> Optional[Task]:
        """
        Find a task by its ID.

        Args:
            task_id: The ID of the task to find

        Returns:
            The task if found, None otherwise
        """
        for task in self._tasks:
            if task.id == task_id:
                return task
        return None

    def add_task(self, title: str, description: str = "") -> Task:
        """
        Add a new task with validation.

        Args:
            title: The title of the task (required)
            description: The description of the task (optional)

        Returns:
            The newly created task

        Raises:
            ValueError: If title is empty or contains only whitespace
        """
        # Create a new task with the next available ID
        new_task = Task(
            id=self._next_id,
            title=title,
            description=description
        )

        # Add the task to the list
        self._tasks.append(new_task)

        # Increment the ID counter for the next task
        self._next_id += 1

        return new_task

    def list_tasks(self) -> List[Task]:
        """
        Retrieve all tasks from storage.

        Returns:
            List of all tasks
        """
        return self._tasks.copy()  # Return a copy to prevent external modification

    def update_task(self, task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> Optional[Task]:
        """
        Update an existing task's title and/or description.

        Args:
            task_id: The ID of the task to update
            title: New title (optional, None means keep current)
            description: New description (optional, None means keep current)

        Returns:
            The updated task if successful, None if task not found
        """
        task = self.find_task_by_id(task_id)
        if task is None:
            return None

        # Update title if provided
        if title is not None:
            if not title or not title.strip():
                raise ValueError("Task title cannot be empty or contain only whitespace")
            task.title = title

        # Update description if provided
        if description is not None:
            task.description = description

        return task

    def delete_task(self, task_id: int) -> bool:
        """
        Delete a task by ID.

        Args:
            task_id: The ID of the task to delete

        Returns:
            True if the task was deleted, False if not found
        """
        task = self.find_task_by_id(task_id)
        if task is None:
            return False

        self._tasks.remove(task)
        return True

    def toggle_task_completion(self, task_id: int) -> Optional[Task]:
        """
        Toggle a task's completion status.

        Args:
            task_id: The ID of the task to toggle

        Returns:
            The updated task if successful, None if task not found
        """
        task = self.find_task_by_id(task_id)
        if task is None:
            return None

        task.completed = not task.completed
        return task