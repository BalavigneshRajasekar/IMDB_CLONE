const mongoose = require("mongoose");

const producerSchema = new mongoose.Schema(
  {
    producerName: { type: String, required: true },
    gender: { type: String },
  },
  { collection: "Producer", timestamps: true }
);

const Producer = mongoose.model("Producer", producerSchema);

module.exports = Producer;
