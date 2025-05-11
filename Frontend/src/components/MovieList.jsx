/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";

function MovieList() {
  const { movies } = useSelector((store) => store.movie);
  return (
    <div>
      <h1>{movies.length}</h1>
    </div>
  );
}

export default MovieList;
