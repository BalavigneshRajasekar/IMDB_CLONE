const express = require("express");
const userController = require("../controller/user.controller");
const userRouter = express.Router();

userRouter.post("/create", userController.createUser);
userRouter.post("/logIn", userController.loginUser);

module.exports = userRouter;
