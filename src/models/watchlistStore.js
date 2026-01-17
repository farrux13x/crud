// In-memory data store for watchlist items.
let nextId = 1;
const watchlist = [];

function getAll() {
  return watchlist;
}

function create({ title, genre, year, director, rating, poster }) {
  const item = {
    id: nextId++,
    title,
    genre,
    year,
    director,
    rating,
    poster,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  watchlist.push(item);
  return item;
}

function update(id, { title, genre, year, director, rating, poster }) {
  const item = watchlist.find((entry) => entry.id === id);
  if (!item) return null;

  if (title !== undefined) {
    item.title = title;
  }

  if (genre !== undefined) {
    item.genre = genre;
  }

  if (year !== undefined) {
    item.year = year;
  }

  if (director !== undefined) {
    item.director = director;
  }

  if (rating !== undefined) {
    item.rating = rating;
  }

  if (poster !== undefined) {
    item.poster = poster;
  }

  item.updatedAt = new Date().toISOString();
  return item;
}

function remove(id) {
  const index = watchlist.findIndex((entry) => entry.id === id);
  if (index === -1) return null;

  const [removed] = watchlist.splice(index, 1);
  return removed;
}

module.exports = {
  getAll,
  create,
  update,
  remove,
};
