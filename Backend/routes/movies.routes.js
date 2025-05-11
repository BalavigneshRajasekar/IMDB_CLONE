const express = require("express");
const movieController = require("../controller/movies.controller");
const movieRouter = express.Router();

// Endpoint to get all movies
movieRouter.get("/get", movieController.getMovies);
movieRouter.get("/get/movie/:id", movieController.getSingleMovie);

module.exports = movieRouter;
