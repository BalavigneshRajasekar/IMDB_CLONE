const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema(
  {
    actorName: { type: String, required: true },
    gender: { type: string },
  },
  { collection: "Actor", timestamps: true }
);

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;
