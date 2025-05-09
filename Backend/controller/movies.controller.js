const getTMDBMovies = require("../tmdbConfig");

class MovieController {
  async getMovies(req, res) {
    try {
      const allMovies = await getTMDBMovies();
      res.status(200).json({ message: "movies retrieved", data: allMovies });
    } catch (e) {
      res.status(500).json({ message: "server error", error: e.message });
    }
  }
}

module.exports = new MovieController();
