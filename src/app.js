// App bootstrap: config, middleware, and routes.
const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Enable CORS for all origins by default.
app.use(cors());

// Parse JSON request bodies.
app.use(express.json());

// Mount API routes.
app.use("/api/todos", todoRoutes);

// Basic error handler (kept last).
app.use(errorHandler);

module.exports = app;
