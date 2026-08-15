const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ---- In-memory data store (swap for a real DB when you're ready) ----
let tasks = [
  {
    id: uuidv4(),
    title: 'Welcome to Task-Api',
    description: 'This is a sample task. Try creating, updating, and deleting tasks!',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

// ---- Helpers ----
const findTask = (id) => tasks.find((t) => t.id === id);

// ---- Routes ----

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Get all tasks
app.get('/tasks', (req, res) => {
  const { completed } = req.query;
  let result = tasks;
  if (completed !== undefined) {
    const isCompleted = completed === 'true';
    result = tasks.filter((t) => t.completed === isCompleted);
  }
  res.json(result);
});

// Get a single task
app.get('/tasks/:id', (req, res) => {
  const task = findTask(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// Create a task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'A "title" string is required' });
  }
  const newTask = {
    id: uuidv4(),
    title,
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task (partial update)
app.put('/tasks/:id', (req, res) => {
  const task = findTask(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const { title, description, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = Boolean(completed);
  task.updatedAt = new Date().toISOString();

  res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  const [deleted] = tasks.splice(index, 1);
  res.json(deleted);
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Task-Api listening on port ${PORT}`);
});
