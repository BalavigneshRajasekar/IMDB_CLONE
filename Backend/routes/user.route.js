const express = require("express");
const userController = require("../controller/user.controller");
const userRouter = express.Router();

userRouter.post("/create/user", userController.createUser);
