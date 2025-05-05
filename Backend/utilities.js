const jwt = require("jsonwebtoken");

class Utilities {
  static generateLogToken(user, res) {
    const token = jwt.sign(
      {
        userName: user.userName,
        email: user.email,
        _id: user._id,
      },
      process.env.LOG_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "none", // set to 'none' for cross-site requests
      path: "/", // set to '/' for all routes
    });
  }
}

module.exports = Utilities;
