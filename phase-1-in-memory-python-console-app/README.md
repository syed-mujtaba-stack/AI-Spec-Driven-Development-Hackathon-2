# Evolution of Todo - Phase 1 Console App

A simple, in-memory console-based todo application built with Python, following clean architecture principles and the Spec-Kit Plus methodology.

## Description

This console application allows users to manage their tasks through a simple menu-driven interface. It features full CRUD operations (Create, Read, Update, Delete) plus the ability to toggle task completion status. The application stores all data in memory, making it perfect for quick task management without persistence requirements.

### Features
- Add new tasks with title and description
- List all tasks with completion status
- Update existing tasks
- Delete tasks
- Toggle task completion status
- Input validation and user-friendly error messages
- Auto-incrementing task IDs

## Setup Instructions

### Prerequisites
- Python 3.13 or higher
- (Optional) `uv` for virtual environment management

### Installation
1. Clone or download the repository
2. Navigate to the project directory
3. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
   OR using `uv`:
   ```bash
   uv venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

4. Install dependencies (if any are added in the future):
   ```bash
   pip install -r requirements.txt
   ```

### Running the Application
```bash
python src/todo_app/main.py
```

## Demo Steps

1. **Launch the application**:
   ```bash
   python src/todo_app/main.py
   ```

2. **Add tasks**:
   - Select option 1 (Add Task)
   - Enter a title (e.g., "Buy groceries")
   - Enter a description (optional)
   - Repeat to add a second task

3. **List tasks**:
   - Select option 2 (List Tasks)
   - View all tasks with their completion status ([ ] for incomplete, [x] for complete)

4. **Update a task**:
   - Select option 3 (Update Task)
   - Enter the task ID to update
   - Enter new title or press Enter to keep current
   - Enter new description or press Enter to keep current

5. **Toggle completion**:
   - Select option 5 (Toggle Complete)
   - Enter the task ID to toggle
   - Observe the status change in the next list view

6. **Delete a task**:
   - Select option 4 (Delete Task)
   - Enter the task ID to delete
   - Confirm the deletion

7. **Exit the application**:
   - Select option 6 (Exit) to quit

## Architecture

The application follows a clean architecture pattern with clear separation of concerns:
- `models.py`: Data models (Task dataclass)
- `services.py`: Business logic (TaskManager class)
- `cli.py`: Command-line interface logic
- `main.py`: Application entry point
- `utils.py`: Utility functions

## Project Structure

```
src/
└── todo_app/
    ├── __init__.py
    ├── main.py          # Entry point and main loop
    ├── models.py        # Task data model
    ├── services.py      # Business logic
    ├── cli.py           # CLI interface
    └── utils.py         # Utility functions
```

## Technology Stack

- Python 3.13+
- Standard library only (no external dependencies)
- Type hints for all functions
- Dataclass for the Task model
- In-memory storage using Python built-in collections