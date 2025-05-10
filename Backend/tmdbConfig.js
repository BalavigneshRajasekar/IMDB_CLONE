const axios = require("axios");
const movieService = require("./service/movies.service");
const actorService = require("./service/actor.service");
const producerService = require("./service/producer.service");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Endpoint to get popular movies
async function fetchPopularMovies(pages = 3) {
  let movies = [];
  for (let page = 1; page <= pages; page++) {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page,
      },
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    });
    movies = movies.concat(response.data.results);
  }

  return movies.slice(0, 50); // Ensure only 50 movies are returned
}

// Endpoint to get cast and producer names
async function fetchMovieDetails(movieId) {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      append_to_response: "credits",
    },
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  });
  return response.data;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function getMovies() {
  try {
    const popularMovies = await fetchPopularMovies();

    for (const movie of popularMovies) {
      const details = await fetchMovieDetails(movie.id);
      const credits = details.credits;
      await sleep(300);

      // Handle actors
      const actorIds = [];
      for (const actor of credits.cast.slice(0, 5)) {
        let existingActor = await actorService.findOne({
          actorName: actor.name,
        });
        if (!existingActor) {
          existingActor = await actorService.createActor({
            actorName: actor.name,
            gender: actor.gender === 1 ? "Female" : "Male",
          });
        }
        actorIds.push(existingActor._id);
      }

      // Handle producers
      const producerIds = [];
      const producers = credits.crew.filter(
        (member) => member.job === "Producer"
      );
      for (const producer of producers) {
        let existingProducer = await producerService.findOne({
          producerName: producer.name,
        });
        if (!existingProducer) {
          existingProducer = await producerService.createProducer({
            producerName: producer.name,
            gender: producer.gender === 1 ? "Female" : "Male",
          });
        }
        producerIds.push(existingProducer._id);
      }

      // Save movie
      const exists = await movieService.findOne({ movieName: details.title });
      if (!exists) {
        await movieService.createMovies({
          movieName: details.title,
          releaseYear: details.release_date,
          ratings: details.vote_average,
          description: details.overview,
          movieImage: `https://image.tmdb.org/t/p/w500${details.poster_path}`,
          actors: actorIds,
          producers: producerIds,
        });
      }
    }
  } catch (error) {
    console.error("Error fetching movie data:", error.message);
  }
}

module.exports = getMovies;
