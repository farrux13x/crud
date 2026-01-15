// Controller logic for todo routes.
const todoStore = require("../models/todoStore");

// Helper to create an error with HTTP status.
function createError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

// GET /api/todos
function getAll(req, res) {
  const todos = todoStore.getAll();
  res.json(todos);
}

// POST /api/todos
function create(req, res, next) {
  const { text } = req.body;

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return next(createError(400, "text is required"));
  }

  const todo = todoStore.create({ text: text.trim() });
  res.status(201).json(todo);
}

// PUT /api/todos/:id
function update(req, res, next) {
  const { id } = req.params;
  const { text, completed } = req.body;

  if (text !== undefined && (typeof text !== "string" || text.trim().length === 0)) {
    return next(createError(400, "text must be a non-empty string"));
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return next(createError(400, "completed must be a boolean"));
  }

  const updated = todoStore.update(id, {
    text: text !== undefined ? text.trim() : undefined,
    completed,
  });

  if (!updated) {
    return next(createError(404, "todo not found"));
  }

  res.json(updated);
}

// DELETE /api/todos/:id
function remove(req, res, next) {
  const { id } = req.params;
  const removed = todoStore.remove(id);

  if (!removed) {
    return next(createError(404, "todo not found"));
  }

  res.json(removed);
}

module.exports = {
  getAll,
  create,
  update,
  remove,
};
