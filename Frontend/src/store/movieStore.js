import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieReducer";
const movieStore = configureStore({
  reducer: {
    store: movieReducer,
  },
});

export default movieStore;
