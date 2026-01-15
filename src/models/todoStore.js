// In-memory data store for todos.
const { randomUUID } = require("crypto");

const todos = [];

function getAll() {
  return todos;
}

function create({ text }) {
  const todo = {
    id: randomUUID(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  todos.push(todo);
  return todo;
}

function update(id, { text, completed }) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return null;

  if (text !== undefined) {
    todo.text = text;
  }

  if (completed !== undefined) {
    todo.completed = completed;
  }

  todo.updatedAt = new Date().toISOString();
  return todo;
}

function remove(id) {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const [removed] = todos.splice(index, 1);
  return removed;
}

module.exports = {
  getAll,
  create,
  update,
  remove,
};
