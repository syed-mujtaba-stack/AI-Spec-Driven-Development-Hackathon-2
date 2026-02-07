"""
Main Application Entry Point

This module implements the main application loop that integrates CLI and service layers.
"""
from .cli import (
    display_menu, add_task_flow, list_tasks_flow, update_task_flow,
    delete_task_flow, toggle_completion_flow
)
from .services import TaskManager


def main():
    """
    Main application loop that integrates CLI and service layers.
    """
    print("Welcome to the Todo App!")

    # Initialize the task manager
    task_manager = TaskManager()

    while True:
        display_menu()

        choice = input("Choose an option (1-6): ").strip()

        if choice == "1":
            add_task_flow(task_manager)
        elif choice == "2":
            list_tasks_flow(task_manager)
        elif choice == "3":
            update_task_flow(task_manager)
        elif choice == "4":
            delete_task_flow(task_manager)
        elif choice == "5":
            toggle_completion_flow(task_manager)
        elif choice == "6":
            print("Thank you for using the Todo App. Goodbye!")
            break
        else:
            print("Invalid option. Please choose a number between 1-6.")

        # Pause to let user see the result before showing menu again
        input("\nPress Enter to continue...")


if __name__ == "__main__":
    main()