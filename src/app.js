// App bootstrap: config, middleware, and routes.
const express = require("express");
const cors = require("cors");
const watchlistRoutes = require("./routes/watchlistRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Enable CORS for all origins by default.
app.use(cors());

// Parse JSON request bodies.
app.use(express.json());

// Mount API routes.
app.use("/api/watchlist", watchlistRoutes);

// Basic error handler (kept last).
app.use(errorHandler);

module.exports = app;
