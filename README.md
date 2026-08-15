# Task-API

A simple Task management REST API (Node.js + Express) containerized with Docker, plus a lightweight static frontend — built for **Practical-9: Containerize a Python/Node.js/Java application using Docker** (Silver Oak University).

## Project Structure

Task-API/
├── src/
│ └── index.js # Express backend (Task CRUD API)
├── frontend/
│ └── index.html # Static frontend UI
├── package.json
├── Dockerfile # Containerizes the Node.js backend
├── docker-compose.yml # Runs backend + frontend together
├── .dockerignore
├── .gitignore
└── README.md

## Prerequisites

- Docker Desktop installed and running
- Git installed

## How to run (matches the practical steps)

```bash
cd Desktop
git clone https://github.com/Sujal-Shrivastav-07/Task-API.git
cd Task-API
docker compose up --build
```

This will:
1. Build a Docker image for the backend from the `Dockerfile`
2. Start the **backend** container → API available at `http://localhost:3000`
3. Start an **nginx** container serving the frontend → available at `http://localhost:8080`

Alternatively, you can just open `Task-API/frontend/index.html` directly in your browser (double-click it) — it talks to `http://localhost:3000` as long as the backend container is running.

## Verifying the container

```bash
docker ps                        # confirm task-api and task-api-frontend are running
curl http://localhost:3000/health   # {"status":"ok","uptime":...}
```

Stop everything with:

```bash
docker compose down
```

## API Endpoints

| Method | Endpoint         | Description              |
|--------|------------------|---------------------------|
| GET    | `/health`        | Health check               |
| GET    | `/tasks`         | List all tasks (supports `?completed=true/false`) |
| GET    | `/tasks/:id`     | Get a single task          |
| POST   | `/tasks`         | Create a task (`{ "title": "...", "description": "..." }`) |
| PUT    | `/tasks/:id`     | Update a task (partial: `title`, `description`, `completed`) |
| DELETE | `/tasks/:id`     | Delete a task              |

### Example

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Finish Docker practical", "description": "Push to GitHub"}'
```

## Notes for the practical report

- **Base image:** `node:20-alpine` (small, production-friendly)
- **Layer caching:** `package*.json` is copied and installed before the rest of the source, so `npm install` is only re-run when dependencies change
- **Compose orchestration:** two services (`task-api` backend, `frontend` via nginx) are started together with one command
- **Ports:** backend `3000`, frontend `8080`