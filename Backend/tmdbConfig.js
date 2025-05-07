const axios = require("axios");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const API_KEY = "c441c9e64fc83594c1b60b5d49b68535";
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDQxYzllNjRmYzgzNTk0YzFiNjBiNWQ0OWI2ODUzNSIsIm5iZiI6MS43MzkyMTAzMzYzMDA5OTk5ZSs5LCJzdWIiOiI2N2FhM2U2MDRlOThmMjFiNDI2ZmFiMzkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.XchXkuddWH8UYNfz-P9Tl8D_4aXHfr9tU8Ta501qdnM`,
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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDQxYzllNjRmYzgzNTk0YzFiNjBiNWQ0OWI2ODUzNSIsIm5iZiI6MS43MzkyMTAzMzYzMDA5OTk5ZSs5LCJzdWIiOiI2N2FhM2U2MDRlOThmMjFiNDI2ZmFiMzkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.XchXkuddWH8UYNfz-P9Tl8D_4aXHfr9tU8Ta501qdnM`,
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
        releaseDate: details.release_date,
        rating: details.vote_average,
        posterUrl: `https://image.tmdb.org/t/p/w500${details.poster_path}`,
        cast: topCast,
        producers,
      });
    }

    console.log(detailedMovies);
  } catch (error) {
    console.error("Error fetching movie data:", error.message);
  }
}

module.exports = getMovies;
