const User = require("../models/user.modal");

class UserService {
  async getUser(email) {
    try {
      const existingUser = await User.findOne(email);
      return existingUser;
    } catch (e) {
      throw new Error(e);
    }
  }
  async createUser(userData) {
    try {
      const newUser = await User.create(userData);
      newUser.save();
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = new UserService();
