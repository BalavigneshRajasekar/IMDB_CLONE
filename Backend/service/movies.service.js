const Movies = require("../models/actors.modal");

class MovieService {
  async findOne(value) {
    try {
      const movie = await Movies.findOne(value);
      return movie;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async createMovies(value) {
    try {
      const movie = await Movies.create(value);
      movie.save();
      return movie;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = new MovieService();
