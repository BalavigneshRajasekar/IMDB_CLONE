const getTMDBMovies = require("../tmdbConfig");
const movieService = require("../service/movies.service");

class MovieController {
  async getMovies(req, res) {
    try {
      const movies = await movieService.find();

      if (movies.length == 0) {
        const allMovies = await getTMDBMovies();
      }

      res.status(200).json({ message: "movies retrieved", data: movies });
    } catch (e) {
      res.status(500).json({ message: "server error", error: e.message });
    }
  }
}

module.exports = new MovieController();
