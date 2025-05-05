const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    movieName: { type: String, require: true },
    releaseYear: { type: Number, require: true },
    movieImage: { type: String, required: true },
    actors: [{ type: mongoose.Types.ObjectId, ref: "Actors" }],
    producerName: { type: String, required: true },
  },
  { timestamps: true, collection: "Movies" }
);

const Movies = mongoose.model("Movies", movieSchema);

module.exports = Movies;
