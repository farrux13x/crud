// Route definitions for /api/todos.
const express = require("express");
const todoController = require("../controllers/todoController");

const router = express.Router();

// GET /api/todos - fetch all todos.
router.get("/", todoController.getAll);

// POST /api/todos - create a new todo.
router.post("/", todoController.create);

// PUT /api/todos/:id - update todo text/status.
router.put("/:id", todoController.update);

// DELETE /api/todos/:id - remove a todo.
router.delete("/:id", todoController.remove);

module.exports = router;
