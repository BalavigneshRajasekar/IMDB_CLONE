const getTMDBMovies = require("../tmdbConfig");
const movieService = require("../service/movies.service");
const actorService = require("../service/actor.service");
const producerService = require("../service/producer.service");
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

  async getSingleMovie(req, res) {
    const { id } = req.params;
    try {
      const movie = await movieService.findOne({ _id: id });
      res.status(200).json({ message: "movies retrieved", data: movie });
    } catch (e) {
      res.status(500).json({ message: "server error", error: e.message });
    }
  }

  async addMovies(req, res) {
    console.log(req.body);

    const { movieName, releaseYear, description, actors, producers, ratings } =
      req.body;
    try {
      if (
        !movieName &&
        !releaseYear &&
        !description &&
        !actors &&
        !producers &&
        !ratings
      ) {
        return res.status(400).json({ message: "some field is missing" });
      }
      //Convert the actors into an array
      const actorsArray = actors.split(",");
      const producerArray = producers.split(",");
      const actorIds = [];
      for (const actor of actorsArray) {
        //If actor already exist get their ID
        //If not create an actor and get the ID
        let existingActor = await actorService.findOne({
          actorName: actor,
        });
        if (!existingActor) {
          existingActor = await actorService.createActor({
            actorName: actor,
          });
        }
        actorIds.push(existingActor._id);
      }
      //If producer already exist get their ID
      //If not create an producer and get the ID
      const producerIds = [];
      for (const producer of producerArray) {
        let existingProducer = await producerService.findOne({
          producerName: producer,
        });
        if (!existingProducer) {
          existingProducer = await producerService.createProducer({
            producerName: producer,
          });
        }
        producerIds.push(existingProducer._id);
      }
      //Create movie and add all data to movie collection
      const newMovie = await movieService.createMovies({
        movieName: movieName,
        releaseYear: releaseYear,
        ratings: ratings,
        description: description,
        movieImage: "movie",
        actors: actorIds,
        producers: producerIds,
      });

      res.status(200).json({ message: "New movie added", movie: newMovie });
    } catch (e) {
      res.status(500).json({ message: "server error", error: e.message });
    }
  }
  async editMovies(req, res) {
    const movieId = req.params.id;
    const {
      movieName,
      releaseYear,
      description,
      actors,
      producers,
      ratings,
      movieImage,
    } = req.body;
    try {
      if (
        !movieName &&
        !releaseYear &&
        !description &&
        !actors &&
        !producers &&
        !ratings
      ) {
        return res.status(400).json({ message: "some field is missing" });
      }
      //Convert the actors into an array
      const actorsArray = actors.split(",");
      const producerArray = producers.split(",");
      const actorIds = [];
      for (const actor of actorsArray) {
        //If actor already exist get their ID
        //If not create an actor and get the ID
        let existingActor = await actorService.findOne({
          actorName: actor,
        });
        if (!existingActor) {
          existingActor = await actorService.editActors({
            actorName: actor,
          });
        }
        actorIds.push(existingActor._id);
      }
      //If producer already exist get their ID
      //If not create an producer and get the ID
      const producerIds = [];
      for (const producer of producerArray) {
        let existingProducer = await producerService.findOne({
          producerName: producer,
        });
        if (!existingProducer) {
          existingProducer = await producerService.editProducer({
            producerName: producer,
          });
        }
        producerIds.push(existingProducer._id);
      }
      //Create movie and add all data to movie collection
      const newMovie = await movieService.editMovies(movieId, {
        movieName: movieName,
        releaseYear: releaseYear,
        ratings: ratings,
        description: description,
        movieImage: movieImage ? movieImage : "null",
        actors: actorIds,
        producers: producerIds,
      });

      res
        .status(200)
        .json({ message: "movie edited success", movie: newMovie });
    } catch (e) {
      res.status(500).json({ message: "server error", error: e.message });
    }
  }

  async deleteMovie(req, res) {
    const { id } = req.params;

    try {
      const deletedMovie = await movieService.deleteMovies(id);
      res
        .status(200)
        .json({ message: "movie Deleted success", movie: deletedMovie });
    } catch (e) {
      res.status(500).json({ message: "server error", error: e.message });
    }
  }
}

module.exports = new MovieController();
