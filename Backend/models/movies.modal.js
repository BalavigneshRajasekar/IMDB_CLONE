const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    movieName: { type: String, require: true },
    description: { type: String, required: true },
    ratings: { type: String },
    releaseYear: { type: String, require: true },
    movieImage: { type: String, required: true },
    actors: [{ type: mongoose.Types.ObjectId, ref: "Actor" }],
    producers: [{ type: mongoose.Types.ObjectId, ref: "Producer" }],
  },
  { timestamps: true, collection: "Movies" }
);

const Movies = mongoose.model("Movies", movieSchema);

module.exports = Movies;
