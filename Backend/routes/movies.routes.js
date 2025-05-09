const express = require("express");
const movieController = require("../controller/movies.controller");
const movieRouter = express.Router();

// Endpoint to get all movies
movieRouter.get("/get", movieController.getMovies);

module.exports = movieRouter;
