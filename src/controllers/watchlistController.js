// Controller logic for watchlist routes.
const watchlistStore = require("../models/watchlistStore");

// Helper to create an error with HTTP status.
function createError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

// GET /api/watchlist
function getAll(req, res) {
  const items = watchlistStore.getAll();
  res.json(items);
}

// POST /api/watchlist
function create(req, res, next) {
  const { title, genre, year, director, rating, poster } = req.body;

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return next(createError(400, "title is required"));
  }

  if (!genre || typeof genre !== "string" || genre.trim().length === 0) {
    return next(createError(400, "genre is required"));
  }

  if (year === undefined || typeof year !== "number" || Number.isNaN(year)) {
    return next(createError(400, "year must be a number"));
  }

  if (!director || typeof director !== "string" || director.trim().length === 0) {
    return next(createError(400, "director is required"));
  }

  if (rating === undefined || typeof rating !== "number" || Number.isNaN(rating)) {
    return next(createError(400, "rating must be a number"));
  }

  if (!poster || typeof poster !== "string" || poster.trim().length === 0) {
    return next(createError(400, "poster is required"));
  }

  const item = watchlistStore.create({
    title: title.trim(),
    genre: genre.trim(),
    year,
    director: director.trim(),
    rating,
    poster: poster.trim(),
  });
  res.status(201).json(item);
}

// PUT /api/watchlist/:id
function update(req, res, next) {
  const id = Number(req.params.id);
  const { title, genre, year, director, rating, poster } = req.body;

  if (Number.isNaN(id)) {
    return next(createError(400, "id must be a number"));
  }

  if (title !== undefined && (typeof title !== "string" || title.trim().length === 0)) {
    return next(createError(400, "title must be a non-empty string"));
  }

  if (genre !== undefined && (typeof genre !== "string" || genre.trim().length === 0)) {
    return next(createError(400, "genre must be a non-empty string"));
  }

  if (year !== undefined && (typeof year !== "number" || Number.isNaN(year))) {
    return next(createError(400, "year must be a number"));
  }

  if (
    director !== undefined &&
    (typeof director !== "string" || director.trim().length === 0)
  ) {
    return next(createError(400, "director must be a non-empty string"));
  }

  if (rating !== undefined && (typeof rating !== "number" || Number.isNaN(rating))) {
    return next(createError(400, "rating must be a number"));
  }

  if (poster !== undefined && (typeof poster !== "string" || poster.trim().length === 0)) {
    return next(createError(400, "poster must be a non-empty string"));
  }

  const updated = watchlistStore.update(id, {
    title: title !== undefined ? title.trim() : undefined,
    genre: genre !== undefined ? genre.trim() : undefined,
    year,
    director: director !== undefined ? director.trim() : undefined,
    rating,
    poster: poster !== undefined ? poster.trim() : undefined,
  });

  if (!updated) {
    return next(createError(404, "watchlist item not found"));
  }

  res.json(updated);
}

// DELETE /api/watchlist/:id
function remove(req, res, next) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return next(createError(400, "id must be a number"));
  }

  const removed = watchlistStore.remove(id);

  if (!removed) {
    return next(createError(404, "watchlist item not found"));
  }

  res.json(removed);
}

module.exports = {
  getAll,
  create,
  update,
  remove,
};
