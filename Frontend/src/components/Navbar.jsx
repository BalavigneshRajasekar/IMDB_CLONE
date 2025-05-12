import React from "react";
import { useDispatch } from "react-redux";
import { handleLoginModal } from "../store/movieReducer";
import useAuth from "../Hooks/useAuth";

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  return (
    <div className="bg-yellow-400 flex h-20 justify-between items-center p-3">
      <div className="">
        <h1>IMDB APP</h1>
      </div>
      <div>
        {user ? (
          <button className="bg-red-500 active:scale-75 transition-all">
            Logout
          </button>
        ) : (
          <button
            className="bg-black active:scale-75 transition-all"
            onClick={() =>
              dispatch(handleLoginModal({ type: "Login", data: true }))
            }
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
