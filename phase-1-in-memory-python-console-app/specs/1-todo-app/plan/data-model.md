# Data Model: Todo Console App

**Feature**: 1-todo-app
**Created**: 2025-12-26

## Entity: Task

### Attributes
- **id**: int
  - Type: Integer
  - Description: Unique auto-incremented identifier
  - Constraints: Must be unique, auto-generated
  - Required: Yes

- **title**: str
  - Type: String
  - Description: Task title or name
  - Constraints: Required, must not be empty or whitespace only
  - Required: Yes

- **description**: str
  - Type: String
  - Description: Optional task description
  - Constraints: Optional, can be empty string
  - Required: No (defaults to empty string)

- **completed**: bool
  - Type: Boolean
  - Description: Completion status of the task
  - Constraints: Boolean value only
  - Required: Yes (defaults to False)

- **created_at**: datetime
  - Type: datetime
  - Description: Timestamp of task creation
  - Constraints: Automatically set on creation
  - Required: Yes

### Validation Rules
1. **ID Validation**: Must be unique within the system, auto-incremented from a counter
2. **Title Validation**: Must not be empty or contain only whitespace characters
3. **Description Validation**: Can be empty or contain any string content
4. **Completed Validation**: Must be a boolean value (True or False)
5. **Created_at Validation**: Automatically set to current datetime on creation

### State Transitions
- **completed status**: Can transition from False to True (mark complete) or True to False (mark incomplete)

### Relationships
- None - Task is an independent entity

### Dataclass Implementation
```python
from dataclasses import dataclass
from datetime import datetime
from typing import Optional

@dataclass
class Task:
    id: int
    title: str
    description: str = ""
    completed: bool = False
    created_at: datetime = None

    def __post_init__(self):
        if self.created_at is None:
            self.created_at = datetime.now()

        # Validate title is not empty or whitespace only
        if not self.title or not self.title.strip():
            raise ValueError("Task title cannot be empty or contain only whitespace")
```

### Storage Considerations
- Tasks will be stored in an in-memory list: `List[Task]`
- Additional counter needed to maintain unique auto-incrementing IDs
- Need helper functions to find tasks by ID efficiently