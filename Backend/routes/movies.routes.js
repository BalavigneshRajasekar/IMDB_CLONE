const express = require("express");
const movieController = require("../controller/movies.controller");
const movieRouter = express.Router();
const logAuth = require("../middleware/logAuth.middleware");
// Endpoint to get all movies
movieRouter.get("/get", movieController.getMovies);
movieRouter.get("/get/movie/:id", movieController.getSingleMovie);
movieRouter.post("/create/new", logAuth, movieController.addMovies);

module.exports = movieRouter;
