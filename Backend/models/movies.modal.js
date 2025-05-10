const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    movieName: { type: String, require: true },
    description: { type: String, required: true },
    ratings: { type: string },
    releaseYear: { type: Number, require: true },
    movieImage: { type: String, required: true },
    actors: [{ type: mongoose.Types.ObjectId, ref: "Actors" }],
    producers: [{ type: mongoose.Types.ObjectId, ref: "Producers" }],
  },
  { timestamps: true, collection: "Movies" }
);

const Movies = mongoose.model("Movies", movieSchema);

module.exports = Movies;
