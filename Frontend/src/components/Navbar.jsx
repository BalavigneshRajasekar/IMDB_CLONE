import React from "react";

function Navbar() {
  return (
    <div className="bg-yellow-400 flex h-20 justify-between items-center p-3">
      <div className="">
        <h1>IMDB APP</h1>
      </div>
      <div>
        <button className="bg-black active:scale-75 transition-all">
          Login
        </button>
      </div>
    </div>
  );
}

export default Navbar;
