# Task-API

A Dockerized Task Management REST API built with **Node.js + Express**, with a lightweight static frontend served through **Nginx** using Docker Compose.

The application provides a simple interface for creating, updating, deleting, and managing tasks through REST API endpoints, while the frontend allows users to interact with the backend directly from the browser.

## Features

* 📝 Create, update, and delete tasks
* 📋 List all tasks or filter by completion status
* 🔍 Retrieve individual task details
* 🌐 Lightweight static frontend served with Nginx
* 🐳 Dockerized backend and frontend with Docker Compose
* ⚡ Fast startup and simple deployment
* ♻️ RESTful API with JSON responses

## Tech Stack

Node.js · Express.js · Docker · Docker Compose · Nginx · HTML · JavaScript

## Project Structure

```text
Task-API/
├── docker-compose.yml          # Runs backend + frontend together
├── Dockerfile                  # Containerizes the Node.js backend
├── package.json
├── package-lock.json
├── .dockerignore
├── .gitignore
├── README.md
├── src/
│   └── index.js                # Express backend (Task CRUD API)
└── frontend/
    └── index.html              # Static frontend UI
```

---

## How to run — exact steps (Docker Desktop)

**Prerequisite:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

1. Open a terminal, then clone the repository:

   ```bash
   git clone https://github.com/Sujal-Shrivastav-07/Task-API.git
   ```

2. Move into the project folder:

   ```bash
   cd Task-API
   ```

3. Build and start the containers:

   ```bash
   docker compose up --build
   ```

4. Open your browser and visit:

   * **Frontend:** http://localhost:8080
   * **Backend API:** http://localhost:3000

The frontend will load successfully and communicate with the backend API running in the Docker container.

**Where to run each command:** all commands above should be executed from a regular terminal (PowerShell, Command Prompt, Terminal, or the terminal inside VS Code) — **not** from Docker Desktop's GUI. Docker Desktop only needs to be running in the background so the `docker` command can communicate with the Docker engine.

To stop the containers:

```bash
docker compose down
```

## Quick Start (local development, no Docker)

```bash
npm install
npm start
```

Visit `http://localhost:3000`.

To use the frontend locally, open:

```text
frontend/index.html
```

in your browser while the backend server is running.

## API Endpoints

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| GET    | `/health`                | Health check         |
| GET    | `/tasks`                 | List all tasks       |
| GET    | `/tasks?completed=true`  | List completed tasks |
| GET    | `/tasks?completed=false` | List pending tasks   |
| GET    | `/tasks/:id`             | Get a single task    |
| POST   | `/tasks`                 | Create a new task    |
| PUT    | `/tasks/:id`             | Update a task        |
| DELETE | `/tasks/:id`             | Delete a task        |

### Example API Request

Create a task:

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Finish Docker Practical","description":"Push project to GitHub"}'
```

Example response:

```json
{
  "id": 1,
  "title": "Finish Docker Practical",
  "description": "Push project to GitHub",
  "completed": false
}
```

## Verifying the containers

Check that both containers are running:

```bash
docker ps
```

Test the health endpoint:

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok",
  "uptime": 12.34
}
```

## Pushing this project to GitHub

If you are starting from this local folder instead of cloning:

```bash
cd Task-API
git init
git add .
git commit -m "Initial commit: Task API containerized with Docker"
git branch -M main
git remote add origin https://github.com/Sujal-Shrivastav-07/Task-API.git
git push -u origin main
```

## Notes for the practical report

* **Base image:** `node:20-alpine` is used because it is lightweight and suitable for production-ready Node.js applications.
* **Layer caching:** `package.json` and `package-lock.json` are copied before the source code, allowing Docker to cache dependency installation and speed up rebuilds.
* **Express backend:** Implements a RESTful CRUD API for task management using JSON request and response bodies.
* **Nginx frontend:** Serves the static frontend files independently from the backend service.
* **Compose orchestration:** Docker Compose starts both the **task-api** backend and **frontend** (Nginx) containers together using a single command.
* **Ports:** Backend runs on **3000** and frontend runs on **8080** by default.
