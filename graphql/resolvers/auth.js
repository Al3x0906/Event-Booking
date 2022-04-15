const bcrypt = require("bcryptjs");
const User = require("../../models/user.js");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (args) => {
    
    try {
      const existingUser = await User.findOne({
        email: args.userInput.email,
      });
      if (existingUser) {
        throw new Error("User Exists Already");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });

      const result = await user.save();
      return { ...result._doc, password: null };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User doesnot exist baka");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Incorrect Password");
    }
    const token = await jwt.sign(
      { userId: user.id, email: user.email },
      "somesupersecretkey",
      { expiresIn: "2h" }
    );
    return {
      userID: user.id,
      token: token,
      tokenExpiration: 1,
    };
  },
};
