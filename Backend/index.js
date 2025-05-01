const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./dbConfig");
const bodyParser = require("body-parser");

const server = express();

//Server start point

server.listen("3000", () => {
  console.log("server started");
  dbConnection(process.env.MONGO_URI);
});
