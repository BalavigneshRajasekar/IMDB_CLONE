const express = require("express");
const cookies = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./dbConfig");
const bodyParser = require("body-parser");

const server = express();
server.use(bodyParser.json());
server.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],

    // Allow all origins to connect to the server
  })
);
server.use(cookies());
server.use(express.urlencoded({ extended: true }));

//Routes Files
const userRouter = require("./routes/user.route");
const movieRouter = require("./routes/movies.routes");

server.use("/api/user", userRouter);
server.use("/api/movies", movieRouter);

//Server start point

server.listen("3000", () => {
  console.log("server started");
  dbConnection(process.env.MONGO_URI);
});
