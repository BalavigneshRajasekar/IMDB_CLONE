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
export const getSingleMovies = createAsyncThunk(
  "getSingleMovies",
  async (id, thunkAPI) => {
    try {
      console.log(id);

      const response = await axiosInstance.get(`/api/movies/get/movie/${id}`);
      console.log(response);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addNewMovies = createAsyncThunk(
  "addMovies",
  async (newMovie, thunkAPI) => {
    console.log(newMovie);

    try {
      const response = await axiosInstance.post(
        `/api/movies/create/new`,
        newMovie
      );
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
    singleMovie: null,
    Modal: false,
    isLoginModal: false,
    isSignUpModal: false,
    addMovieModal: false,
    editMovieModal: false,
    addMovieLoading: false,
  },
  reducers: {
    removeSingleMovie: (state, action) => {
      state.singleMovie = null;
    },
    handleLoginModal: (state, action) => {
      console.log(action.payload);

      switch (action.payload.type) {
        case "Login":
          state.Modal = action.payload.data;
          state.isLoginModal = true;
          state.isSignUpModal = false;
          state.addMovieModal = false;
          state.editMovieModal = false;
          break;
        case "Signup":
          state.Modal = action.payload.data;
          state.isLoginModal = false;
          state.isSignUpModal = true;
          state.addMovieModal = false;
          state.editMovieModal = false;
          break;
        case "Close":
          state.Modal = action.payload.data;
          state.isLoginModal = false;
          state.isSignUpModal = false;
          state.addMovieModal = false;
          state.editMovieModal = false;
          break;
        case "Add":
          state.Modal = action.payload.data;
          state.isLoginModal = false;
          state.isSignUpModal = false;
          state.addMovieModal = true;
          state.editMovieModal = false;
          break;
        case "Edit":
          state.Modal = action.payload.data;
          state.isLoginModal = false;
          state.isSignUpModal = false;
          state.addMovieModal = false;
          state.editMovieModal = true;
          break;

        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state, action) => {
        state.moviesLoading = true;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.moviesLoading = false;
        state.movies = [...action.payload.data];
      })
      .addCase(getSingleMovies.pending, (state, action) => {
        state.moviesLoading = true;
      })
      .addCase(getSingleMovies.fulfilled, (state, action) => {
        state.moviesLoading = false;
        state.singleMovie = action.payload.data;
      })
      .addCase(addNewMovies.pending, (state, action) => {
        state.addMovieLoading = true;
      })
      .addCase(addNewMovies.fulfilled, (state, action) => {
        state.addMovieLoading = false;
        alert(action.payload.message);
        state.movies = [...state.movies, action.payload.movie];
      })
      .addCase(addNewMovies.rejected, (state, action) => {
        state.addMovieLoading = false;
        console.log(action.payload);
      });
  },
});

export default movieReducer.reducer;
export const { removeSingleMovie, handleLoginModal } = movieReducer.actions;
