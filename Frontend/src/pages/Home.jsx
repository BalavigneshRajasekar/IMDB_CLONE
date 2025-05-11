/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../components/Navbar";
import MovieList from "../components/MovieList";
import { useEffect } from "react";
import { getAllMovies, handleLoginModal } from "../store/movieReducer";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";

function Home() {
  const { Modal: modalView } = useSelector((store) => store.movie);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMovies());
  }, []);
  // const handleModalClose = (e) => {
  //   if (e.target.className !== "box") {
  //     dispatch(handleLoginModal(false));
  //   }
  // };
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <MovieList />
      </main>
      <div className="modalDiv">{modalView && <Modal />}</div>
    </div>
  );
}

export default Home;
