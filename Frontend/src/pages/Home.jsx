import React from "react";
import Navbar from "../components/Navbar";
import MovieList from "../components/MovieList";

function Home() {
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
