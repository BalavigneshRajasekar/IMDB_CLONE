const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps, collection: "User" }
);

const User = mongoose.model(userSchema, "User");

module.exports = User;
