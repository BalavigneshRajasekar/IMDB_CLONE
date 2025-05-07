const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./dbConfig");
const bodyParser = require("body-parser");
const getMovies = require("./tmdbConfig");

const server = express();
server.use(bodyParser.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));

//Routes Files
const userRouter = require("./routes/user.route");

server.use("/api/user", userRouter);

//Server start point

server.listen("3000", () => {
  console.log("server started");
  dbConnection(process.env.MONGO_URI);
  getMovies();
});
