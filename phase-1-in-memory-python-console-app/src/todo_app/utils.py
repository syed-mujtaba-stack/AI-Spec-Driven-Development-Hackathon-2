"""
Utility Functions

This module contains utility functions for input validation and error handling.
"""


def validate_task_title(title: str) -> bool:
    """
    Validate that a task title is not empty or whitespace only.

    Args:
        title: The title to validate

    Returns:
        True if valid, False otherwise
    """
    return bool(title and title.strip())


def validate_task_id(task_id: str) -> bool:
    """
    Validate that a task ID is a valid integer.

    Args:
        task_id: The task ID string to validate

    Returns:
        True if valid, False otherwise
    """
    try:
        int(task_id)
        return True
    except ValueError:
        return False


def format_error_message(message: str) -> str:
    """
    Format an error message with consistent styling.

    Args:
        message: The error message to format

    Returns:
        Formatted error message
    """
    return f"Error: {message}"


def format_success_message(message: str) -> str:
    """
    Format a success message with consistent styling.

    Args:
        message: The success message to format

    Returns:
        Formatted success message
    """
    return f"Success: {message}"