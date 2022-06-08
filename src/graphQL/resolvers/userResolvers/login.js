const bcrypt = require("bcrypt");
const { UserInputError } = require("apollo-server-express");
const generateToken = require("./generateToken");

//user model
const User = require("../../../models/User");
const { validateLoginInput } = require("../../../utils/validators");

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong crendetials";
        throw new UserInputError("Wrong crendetials", { errors });
      }

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        profileURL:user.profileURL,
        token: generateToken(user.id),
      };
    }
  },
};
