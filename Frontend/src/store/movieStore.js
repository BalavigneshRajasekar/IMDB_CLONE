import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieReducer";
const movieStore = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

export default movieStore;
