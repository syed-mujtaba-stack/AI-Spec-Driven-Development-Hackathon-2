# Quick Start Guide: Todo Console App

**Feature**: 1-todo-app
**Created**: 2025-12-26

## Getting Started

### Prerequisites
- Python 3.13 or higher
- No external dependencies required

### Running the Application

1. **Clone or create the project structure**:
   ```
   src/todo_app/
   ├── __init__.py
   ├── main.py          # Entry point and console interface
   ├── models.py        # Data models (Task, etc.)
   ├── services.py      # Business logic
   ├── utils.py         # Utility functions
   └── cli.py           # Console interface logic
   ```

2. **Run the application**:
   ```bash
   python src/todo_app/main.py
   ```

### Using the CLI Menu

Once the application starts, you'll see the main menu:

```
Todo App Menu:
1. Add Task
2. List Tasks
3. Update Task
4. Delete Task
5. Toggle Complete
6. Exit
Choose an option (1-6):
```

### Available Operations

#### 1. Add Task
- Prompts for task title (required)
- Prompts for task description (optional)
- Creates a new task with auto-incremented ID
- Sets completion status to False by default

#### 2. List Tasks
- Displays all tasks with their ID, title, description, and completion status
- Shows [x] for completed tasks and [ ] for incomplete tasks
- If no tasks exist, displays appropriate message

#### 3. Update Task
- Prompts for task ID to update
- Prompts for new title (optional - press Enter to keep current)
- Prompts for new description (optional - press Enter to keep current)
- Validates that the task exists before updating

#### 4. Delete Task
- Prompts for task ID to delete
- Confirms deletion before removing the task
- Validates that the task exists before deletion

#### 5. Toggle Complete
- Prompts for task ID to toggle
- Changes completion status from True to False or False to True
- Validates that the task exists before toggling

#### 6. Exit
- Exits the application
- All data is lost (in-memory storage only)

### Error Handling
- Invalid inputs are handled gracefully with user-friendly messages
- Invalid task IDs are caught and reported
- Empty titles are prevented during task creation
- Out-of-range menu options are handled with prompts to try again