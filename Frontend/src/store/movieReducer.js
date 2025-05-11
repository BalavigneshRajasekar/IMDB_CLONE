/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const movieReducer = createSlice({
  name: movieReducer,
  initialState: {
    movies: [],
  },
  reducers: {
    setMovies: (state, action) => {},
  },
});

export default movieReducer.reducer;
export const { setMovies } = movieReducer.actions;
