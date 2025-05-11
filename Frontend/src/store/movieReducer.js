/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const movieReducer = createSlice({
  name: "movie Reducer",
  initialState: {
    movies: [],
    loginModal: false,
  },
  reducers: {
    setMovies: (state, action) => {},
  },
});

export default movieReducer.reducer;
export const { setMovies } = movieReducer.actions;
