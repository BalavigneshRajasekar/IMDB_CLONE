/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { Rate } from "antd";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function MovieList() {
  const { movies } = useSelector((store) => store.movie);
  const navigate = useNavigate();
  return (
    <div className="">
      {movies.length > 0 ? (
        <div className="flex gap-3 flex-wrap justify-center items-center p-2">
          {movies.map((movie) => (
            <div
              onClick={() => navigate(`/${movie._id}`)}
              className=" w-48 hover:scale-110 active:scale-75 transition-all overflow-hidden md:opacity-60 hover:opacity-100"
              key={movie._id}
            >
              <div>
                <img src={movie.movieImage} className="h-72 "></img>
              </div>
              <h2 className="flex items-center">
                <FaStar className="text-yellow-400 inline-block" />
                {Number(movie.ratings).toFixed(1)}
              </h2>
              <div className="text-center w-full">
                <h1>{movie.movieName}</h1>
                <p>{movie.releaseYear}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>...loading</h1>
      )}
    </div>
  );
}

export default MovieList;
