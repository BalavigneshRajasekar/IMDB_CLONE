const bcrypt = require("bcryptjs");
const userService = require("../service/user.service");
class UserAuth {
  async createUser() {
    try {
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
        username: userName,
        email: email,
        password: hashedPassword,
      };
      await userService.createUser(newUser);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message, error: "server error" });
    }
  }
}

module.exports = new UserAuth();
