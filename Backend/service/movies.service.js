const Movies = require("../models/movies.modal");

class MovieService {
  async findOne(value) {
    try {
      const movie = await Movies.findOne(value)
        ?.populate({ path: "actors" })
        .populate({ path: "producers" });
      return movie;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async find() {
    try {
      const movie = await Movies.find()
        .populate({ path: "actors" })
        .populate({ path: "producers" });
      return movie;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async createMovies(value) {
    try {
      console.log(value);

      const movie = await Movies.create(value);
      movie.save();
      console.log(movie);

      return movie;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = new MovieService();
