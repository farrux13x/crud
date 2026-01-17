// Route definitions for /api/watchlist.
const express = require("express");
const watchlistController = require("../controllers/watchlistController");

const router = express.Router();

// GET /api/watchlist - fetch all watchlist items.
router.get("/", watchlistController.getAll);

// POST /api/watchlist - create a new watchlist item.
router.post("/", watchlistController.create);

// PUT /api/watchlist/:id - update watchlist item.
router.put("/:id", watchlistController.update);

// DELETE /api/watchlist/:id - remove a watchlist item.
router.delete("/:id", watchlistController.remove);

module.exports = router;
