const bcrypt = require("bcrypt");
const { UserInputError } = require("apollo-server-express");
const generateToken = require("./generateToken");
//user model
const User = require("../../../models/User");
const { validateRegisterInput } = require("../../../utils/validators");

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, profileURL } }
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        profileURL
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // TODO: Make sure user doesnt already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        email,
        username,
        profileURL,
        password,
      });

      return {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        profileURL: newUser.profileURL,
        token: generateToken(newUser.id),
      };
    },
  },
};
