/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteMovies,
  getSingleMovies,
  removeSingleMovie,
} from "../store/movieReducer";
import { FaStar } from "react-icons/fa6";
import useAuth from "../Hooks/useAuth";
function SinglePageView() {
  const { user } = useAuth();
  const param = useParams();
  const navigate = useNavigate();
  const { singleMovie, deleteLoading } = useSelector((store) => store.movie);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleMovies(param.id));
    return () => {
      dispatch(removeSingleMovie());
    };
  }, []);

  const handleDelete = async (id) => {
    console.log(id);

    try {
      if (!user) {
        alert("plz login to delete");
      } else {
        const response = await dispatch(deleteMovies(id));
        deleteLoading ? null : navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const edit = () => {
    if (!user) {
      alert("plz login to edit");
    }
  };
  return (
    <>
      <button onClick={() => navigate("/")}>Back</button>
      {singleMovie ? (
        <div className="w-full p-3 md:flex gap-3">
          <div className=" w-fit">
            <img src={singleMovie.movieImage} className=""></img>
          </div>
          <div className="w-fit ">
            <h1 className="">{singleMovie.movieName}</h1>
            <div
              className="flex justify-between items-center
            "
            >
              <h2 className="flex items-center">
                <FaStar className="text-yellow-400 inline-block" />
                {Number(singleMovie.ratings).toFixed(1)}
              </h2>
              <p className="">{singleMovie.releaseYear}</p>
            </div>
            <h2 className="mt-3">Overview:</h2>
            <h2 className="font-light w-full">{singleMovie.description}</h2>
            <h2>Actors</h2>
            <div className="flex gap-2">
              {singleMovie.actors.map((actor) => (
                <h3 key={actor._id} className="bg-green-500 rounded-2xl p-3">
                  {actor.actorName}
                </h3>
              ))}
            </div>

            <h2>Producers</h2>
            <div className="flex gap-2">
              {singleMovie.producers.map((producer) => (
                <h3 key={producer._id} className="bg-green-500 rounded-2xl p-3">
                  {producer.producerName}
                </h3>
              ))}
            </div>

            <div className="mt-3 flex gap-3">
              <button className="bg-yellow-500" onClick={edit}>
                Edit
              </button>
              <button
                className="bg-red-500"
                onClick={() => handleDelete(singleMovie._id)}
              >
                {deleteLoading ? "Deleting" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1>...loading</h1>
      )}
    </>
  );
}

export default SinglePageView;
