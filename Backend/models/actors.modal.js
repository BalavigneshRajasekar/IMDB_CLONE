const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema(
  {
    actorName: { type: String, required: true },
    gender: { type: String },
  },
  { collection: "Actor", timestamps: true }
);

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;
