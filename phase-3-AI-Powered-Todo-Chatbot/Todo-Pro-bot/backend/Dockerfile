# Use the official astral-sh/uv image for lightning-fast builds
FROM ghcr.io/astral-sh/uv:python3.11-slim AS builder

# Enable bytecode compilation and use copy mode for hardlinks (faster in Docker)
ENV UV_COMPILE_BYTECODE=1 UV_LINK_MODE=copy

WORKDIR /app

# Install dependencies first (enables layer caching)
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-project --no-dev

# Add the rest of the project
ADD . /app

# Finalize synchronization
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev

# Create the final production image
FROM python:3.11-slim

# Set environment variables
ENV PATH="/app/.venv/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app

WORKDIR /app

# Create a non-root user (Hugging Face default UID is 1000)
RUN useradd -m -u 1000 user
USER user

# Copy the environment and code from the builder stage
COPY --from=builder --chown=user:user /app /app

# Expose the port used by Hugging Face Spaces
EXPOSE 7860

# Run the application using fastapi-cli
CMD ["fastapi", "dev", "main.py", "--port", "8000"]
