const bcrypt = require("bcryptjs");
const userService = require("../service/user.service");
const Utilities = require("../utilities");
class UserAuth {
  async createUser(req, res) {
    try {
      console.log(req.body);

      const { userName, email, password } = req.body;

      const existingUser = await userService.getUser({ email: email });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      // Hash password before save
      const hashedPassword = await bcrypt.hash(
        password,
        bcrypt.genSaltSync(10)
      );
      const newUser = {
        userName: userName,
        email: email,
        password: hashedPassword,
      };
      await userService.createUser(newUser);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message, error: "server error" });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const isUserExisted = await userService.getUser({ email: email });
      if (!isUserExisted) {
        return res.status(400).json({ message: "user doesn't exist" });
      }
      const isMatch = await bcrypt.compare(password, isUserExisted.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Invalid password, please try again" });
      }
      //Create Log tokens
      Utilities.generateLogToken(isUserExisted, res);
      res.json({
        message: "User logged in successfully",
        user: isUserExisted,
      });
    } catch (error) {
      res.status(500).json({ message: error.message, error: "server error" });
    }
  }
}

module.exports = new UserAuth();
