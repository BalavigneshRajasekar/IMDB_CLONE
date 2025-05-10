const mongoose = require("mongoose");

const producerSchema = new mongoose.Schema(
  {
    actorName: { type: String, required: true },
    gender: { type: string },
  },
  { collection: "Producer", timestamps: true }
);

const Producer = mongoose.model("Producer", producerSchema);

module.exports = Producer;
