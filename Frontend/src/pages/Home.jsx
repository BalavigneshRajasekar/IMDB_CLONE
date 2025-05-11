import React from "react";
import Navbar from "../components/Navbar";
import MovieList from "../components/MovieList";
import { useEffect } from "react";
import { getAllMovies } from "../store/movieReducer";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMovies());
  }, []);
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <MovieList />
      </main>
    </div>
  );
}

export default Home;
