const axios = require("axios");
const Movies = require("./models/movies.modal");
const Actors = require("./models/actors.modal");
const Producer = require("./models/producer.modal");
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

async function getMovies() {
  try {
    const popularMovies = await fetchPopularMovies();
    const detailedMovies = [];

    for (const movie of popularMovies) {
      const details = await fetchMovieDetails(movie.id);

      // Extract top 5 cast members
      const topCast = details.credits.cast
        .slice(0, 5)
        .map((actor) => actor.name);

      // Extract producers from crew
      const producers = details.credits.crew
        .filter((member) => member.job === "Producer")
        .map((producer) => producer.name);

      detailedMovies.push({
        title: details.title,
        overview: details.overview,
        releaseDate: details.release_date,
        rating: details.vote_average,
        posterUrl: `https://image.tmdb.org/t/p/w500${details.poster_path}`,
        cast: topCast,
        producers,
      });
    }
  } catch (error) {
    console.error("Error fetching movie data:", error.message);
  }
}

module.exports = getMovies;
