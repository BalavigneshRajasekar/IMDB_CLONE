/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosConfig";

export const getAllMovies = createAsyncThunk(
  "getAllMovies",
  async (thunkAPI) => {
    try {
      const response = await axiosInstance("/api/movies/get");
      console.log(response);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const movieReducer = createSlice({
  name: "movie Reducer",
  initialState: {
    movies: [],
    moviesLoading: false,
    loginModal: false,
  },
  reducers: {
    setMovies: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state, action) => {
        state.moviesLoading = true;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.moviesLoading = false;
        state.movies = [...action.payload.data];
      });
  },
});

export default movieReducer.reducer;
export const { setMovies } = movieReducer.actions;
