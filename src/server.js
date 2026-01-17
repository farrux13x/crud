// Entry point: loads env, starts HTTP server.
const dotenv = require("dotenv");
const app = require("./app");

// Load environment variables from .env if present.
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Watchlist API listening on port ${PORT}`);
});
