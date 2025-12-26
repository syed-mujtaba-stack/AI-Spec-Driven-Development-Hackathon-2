# Implementation Tasks: Phase 1 Todo Console App Basic Features

**Feature**: 1-todo-app
**Created**: 2025-12-26
**Status**: Ready
**Tasks Version**: 1.0

## Task Prioritization: Model First, Then Storage, Then Operations, Then CLI

### Phase 1: Data Model Implementation

**Task 1.1: Create Project Structure** [X]
- **Description**: Create the required project directory structure with all necessary files
- **Files to create**:
  - src/todo_app/__init__.py
  - src/todo_app/models.py
  - src/todo_app/services.py
  - src/todo_app/cli.py
  - src/todo_app/main.py
- **Dependencies**: None
- **Test/Verification**: Verify directory structure exists with all required files
- **Priority**: P1

**Task 1.2: Implement Task Dataclass** [X]
- **Description**: Create the Task dataclass with all required attributes and validation
- **Files to modify**: src/todo_app/models.py
- **Dependencies**: Task 1.1
- **Test/Verification**:
  - Create Task instance with valid parameters
  - Verify validation prevents empty titles
  - Verify auto-generation of creation timestamp
- **Priority**: P1

### Phase 2: Storage Implementation

**Task 2.1: Create Task Storage Manager** [X]
- **Description**: Implement in-memory storage with list of Task objects and auto-incrementing ID
- **Files to modify**: src/todo_app/services.py
- **Dependencies**: Task 1.2
- **Test/Verification**:
  - Create storage manager instance
  - Verify auto-incrementing ID functionality
  - Store and retrieve a task
- **Priority**: P1

**Task 2.2: Implement Task Finder Helper** [X]
- **Description**: Create helper function to find tasks by ID in the storage
- **Files to modify**: src/todo_app/services.py
- **Dependencies**: Task 2.1
- **Test/Verification**:
  - Add multiple tasks to storage
  - Find tasks by their IDs
  - Verify None returned for non-existent IDs
- **Priority**: P1

### Phase 3: Core Operations Implementation

**Task 3.1: Implement Add Task Function** [X]
- **Description**: Create function to add new tasks with validation
- **Files to modify**: src/todo_app/services.py
- **Dependencies**: Task 1.2, Task 2.1
- **Test/Verification**:
  - Add a valid task and verify it's stored
  - Try to add task with empty title and verify validation error
  - Verify auto-incrementing ID assignment
- **Priority**: P1

**Task 3.2: Implement List Tasks Function** [X]
- **Description**: Create function to retrieve all tasks from storage
- **Files to modify**: src/todo_app/services.py
- **Dependencies**: Task 2.1
- **Test/Verification**:
  - Add multiple tasks
  - List all tasks and verify they're returned correctly
  - Verify empty list when no tasks exist
- **Priority**: P1

**Task 3.3: Implement Update Task Function** [X]
- **Description**: Create function to update existing task's title and/or description
- **Files to modify**: src/todo_app/services.py
- **Dependencies**: Task 2.2
- **Test/Verification**:
  - Add a task
  - Update the task's title and description
  - Verify changes are reflected
  - Try to update non-existent task and verify error handling
- **Priority**: P2

**Task 3.4: Implement Delete Task Function** [X]
- **Description**: Create function to delete a task by ID
- **Files to modify**: src/todo_app/services.py
- **Dependencies**: Task 2.2
- **Test/Verification**:
  - Add a task
  - Delete the task by ID
  - Verify task no longer exists in storage
  - Try to delete non-existent task and verify error handling
- **Priority**: P2

**Task 3.5: Implement Toggle Task Completion Function** [X]
- **Description**: Create function to toggle a task's completion status
- **Files to modify**: src/todo_app/services.py
- **Dependencies**: Task 2.2
- **Test/Verification**:
  - Add a task with completed=False
  - Toggle its completion status
  - Verify status changed to True
  - Try to toggle non-existent task and verify error handling
- **Priority**: P2

### Phase 4: CLI Interface Implementation

**Task 4.1: Implement Input Validation Utilities** [X]
- **Description**: Create utility functions for input validation and error handling
- **Files to modify**: src/todo_app/utils.py (create) and src/todo_app/cli.py
- **Dependencies**: None
- **Test/Verification**:
  - Test validation of task titles (empty, whitespace)
  - Test validation of numeric IDs
  - Verify error message formatting
- **Priority**: P1

**Task 4.2: Implement CLI Menu Display** [X]
- **Description**: Create function to display the main menu options
- **Files to modify**: src/todo_app/cli.py
- **Dependencies**: Task 4.1
- **Test/Verification**:
  - Display menu and verify correct options shown
  - Verify menu format matches spec (1-6 options)
- **Priority**: P1

**Task 4.3: Implement Add Task CLI Flow** [X]
- **Description**: Create CLI interface for adding new tasks
- **Files to modify**: src/todo_app/cli.py
- **Dependencies**: Task 3.1, Task 4.1
- **Test/Verification**:
  - Run CLI flow to add task
  - Verify prompts for title and description
  - Verify validation of empty titles
  - Verify successful task creation message
- **Priority**: P1

**Task 4.4: Implement List Tasks CLI Display** [X]
- **Description**: Create CLI interface for displaying all tasks
- **Files to modify**: src/todo_app/cli.py
- **Dependencies**: Task 3.2
- **Test/Verification**:
  - Add multiple tasks
  - Run CLI flow to list tasks
  - Verify proper display format with [x]/[ ] for completion status
  - Verify message when no tasks exist
- **Priority**: P1

**Task 4.5: Implement Update Task CLI Flow** [X]
- **Description**: Create CLI interface for updating existing tasks
- **Files to modify**: src/todo_app/cli.py
- **Dependencies**: Task 3.3, Task 4.1
- **Test/Verification**:
  - Run CLI flow to update task
  - Verify prompts for task ID and new values
  - Verify validation of inputs
  - Verify successful update message
- **Priority**: P2

**Task 4.6: Implement Delete Task CLI Flow** [X]
- **Description**: Create CLI interface for deleting tasks
- **Files to modify**: src/todo_app/cli.py
- **Dependencies**: Task 3.4, Task 4.1
- **Test/Verification**:
  - Run CLI flow to delete task
  - Verify prompt for task ID
  - Verify validation of ID
  - Verify confirmation and successful deletion message
- **Priority**: P2

**Task 4.7: Implement Toggle Completion CLI Flow** [X]
- **Description**: Create CLI interface for toggling task completion
- **Files to modify**: src/todo_app/cli.py
- **Dependencies**: Task 3.5, Task 4.1
- **Test/Verification**:
  - Run CLI flow to toggle task completion
  - Verify prompt for task ID
  - Verify validation of ID
  - Verify successful toggle message
- **Priority**: P2

### Phase 5: Main Application Integration

**Task 5.1: Implement Main Application Loop** [X]
- **Description**: Create the main loop that integrates CLI and service layers
- **Files to modify**: src/todo_app/main.py
- **Dependencies**: All CLI and service functions
- **Test/Verification**:
  - Run the complete application
  - Verify menu navigation works correctly
  - Test all operations end-to-end
  - Verify exit option works correctly
- **Priority**: P1

**Task 5.2: Add Type Hints Throughout** [X]
- **Description**: Ensure all functions have proper type hints as required by constitution
- **Files to modify**: All files in src/todo_app/
- **Dependencies**: All previous tasks
- **Test/Verification**:
  - Verify all functions have type hints for parameters and return values
  - Run a type checker if available to validate
- **Priority**: P1

**Task 5.3: Add Documentation and Docstrings** [X]
- **Description**: Add comprehensive docstrings to all functions, classes, and modules
- **Files to modify**: All files in src/todo_app/
- **Dependencies**: All previous tasks
- **Test/Verification**:
  - Verify all public functions have docstrings
  - Verify all classes have docstrings
  - Verify all modules have module-level docstrings
- **Priority**: P1

## Dependencies Summary

- **Model Layer**: Task 1.1 → Task 1.2
- **Storage Layer**: Task 1.2 → Task 2.1 → Task 2.2
- **Service Layer**: Task 2.1 → Task 3.1, Task 2.2 → Task 3.3/3.4/3.5
- **CLI Layer**: Task 4.1 → Task 4.2-4.7
- **Integration**: All service/CLI functions → Task 5.1

## Success Criteria for Task Completion

- [ ] All tasks in Phase 1-5 are completed
- [ ] All functional requirements from spec are implemented
- [ ] Application follows the project constitution (type hints, dataclasses, etc.)
- [ ] All validation and error handling scenarios work as specified
- [ ] CLI interface matches the specified menu options
- [ ] In-memory storage works correctly with auto-incrementing IDs
- [ ] All operations (CRUD + toggle) work correctly