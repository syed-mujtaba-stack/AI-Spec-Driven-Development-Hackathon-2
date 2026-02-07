"""
CLI Interface

This module implements the command-line interface for the todo application,
including menu display and user interaction flows.
"""
from typing import Optional
from .services import TaskManager
from .models import Task


def display_menu() -> None:
    """
    Display the main menu options.
    """
    print("\nTodo App Menu:")
    print("1. Add Task")
    print("2. List Tasks")
    print("3. Update Task")
    print("4. Delete Task")
    print("5. Toggle Complete")
    print("6. Exit")
    print()


def validate_task_title(title: str) -> bool:
    """
    Validate that a task title is not empty or whitespace only.

    Args:
        title: The title to validate

    Returns:
        True if valid, False otherwise
    """
    return bool(title and title.strip())


def validate_task_id(task_id: str) -> Optional[int]:
    """
    Validate that a task ID is a valid integer.

    Args:
        task_id: The task ID string to validate

    Returns:
        The integer ID if valid, None otherwise
    """
    try:
        return int(task_id)
    except ValueError:
        return None


def get_user_input(prompt: str) -> str:
    """
    Get user input with a prompt.

    Args:
        prompt: The prompt to display to the user

    Returns:
        The user's input
    """
    return input(prompt).strip()


def display_tasks(tasks: list[Task]) -> None:
    """
    Display all tasks in a formatted way.

    Args:
        tasks: List of tasks to display
    """
    if not tasks:
        print("No tasks found.")
        return

    print("\nYour Tasks:")
    for task in tasks:
        status = "[x]" if task.completed else "[ ]"
        print(f"{task.id}. {status} {task.title}")
        if task.description:
            print(f"    {task.description}")
        print()


def add_task_flow(task_manager: TaskManager) -> None:
    """
    Handle the add task CLI flow.

    Args:
        task_manager: The task manager instance
    """
    print("\n--- Add New Task ---")
    title = get_user_input("Enter task title: ")

    if not validate_task_title(title):
        print("Error: Task title cannot be empty or contain only whitespace.")
        return

    description = get_user_input("Enter task description (optional, press Enter to skip): ")

    try:
        task = task_manager.add_task(title, description)
        print(f"Task '{task.title}' added successfully with ID {task.id}.")
    except ValueError as e:
        print(f"Error: {e}")


def list_tasks_flow(task_manager: TaskManager) -> None:
    """
    Handle the list tasks CLI flow.

    Args:
        task_manager: The task manager instance
    """
    print("\n--- List All Tasks ---")
    tasks = task_manager.list_tasks()
    display_tasks(tasks)


def update_task_flow(task_manager: TaskManager) -> None:
    """
    Handle the update task CLI flow.

    Args:
        task_manager: The task manager instance
    """
    print("\n--- Update Task ---")
    task_id_str = get_user_input("Enter task ID to update: ")
    task_id = validate_task_id(task_id_str)

    if task_id is None:
        print("Error: Please enter a valid task ID (number).")
        return

    # Check if task exists
    existing_task = task_manager.find_task_by_id(task_id)
    if existing_task is None:
        print(f"Error: Task with ID {task_id} not found.")
        return

    print(f"Current task: {existing_task.title}")
    if existing_task.description:
        print(f"Current description: {existing_task.description}")

    new_title = get_user_input("Enter new title (press Enter to keep current): ")
    if new_title == "":
        new_title = None  # Keep current title
    elif not validate_task_title(new_title):
        print("Error: Task title cannot be empty or contain only whitespace.")
        return

    new_description = get_user_input("Enter new description (press Enter to keep current): ")
    if new_description == "":
        new_description = None  # Keep current description

    try:
        updated_task = task_manager.update_task(task_id, new_title, new_description)
        if updated_task:
            print(f"Task {task_id} updated successfully.")
        else:
            print(f"Error: Failed to update task {task_id}.")
    except ValueError as e:
        print(f"Error: {e}")


def delete_task_flow(task_manager: TaskManager) -> None:
    """
    Handle the delete task CLI flow.

    Args:
        task_manager: The task manager instance
    """
    print("\n--- Delete Task ---")
    task_id_str = get_user_input("Enter task ID to delete: ")
    task_id = validate_task_id(task_id_str)

    if task_id is None:
        print("Error: Please enter a valid task ID (number).")
        return

    # Check if task exists
    existing_task = task_manager.find_task_by_id(task_id)
    if existing_task is None:
        print(f"Error: Task with ID {task_id} not found.")
        return

    confirm = get_user_input(f"Are you sure you want to delete task '{existing_task.title}'? (y/N): ").lower()
    if confirm in ['y', 'yes']:
        success = task_manager.delete_task(task_id)
        if success:
            print(f"Task {task_id} deleted successfully.")
        else:
            print(f"Error: Failed to delete task {task_id}.")
    else:
        print("Deletion cancelled.")


def toggle_completion_flow(task_manager: TaskManager) -> None:
    """
    Handle the toggle completion CLI flow.

    Args:
        task_manager: The task manager instance
    """
    print("\n--- Toggle Task Completion ---")
    task_id_str = get_user_input("Enter task ID to toggle: ")
    task_id = validate_task_id(task_id_str)

    if task_id is None:
        print("Error: Please enter a valid task ID (number).")
        return

    # Check if task exists
    existing_task = task_manager.find_task_by_id(task_id)
    if existing_task is None:
        print(f"Error: Task with ID {task_id} not found.")
        return

    updated_task = task_manager.toggle_task_completion(task_id)
    if updated_task:
        status = "completed" if updated_task.completed else "incomplete"
        print(f"Task {task_id} marked as {status}.")
    else:
        print(f"Error: Failed to toggle task {task_id}.")