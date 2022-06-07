const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserInputError } = require("apollo-server");

//user model
const User = require("../../models/User");

//register user
const registerUser = async (args) => {
  const { username, email, password, profileURL } = args;
  // Validate user data
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

  const newUser = new User.create({
    email,
    username,
    profileURL,
    password,
  });

  return {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    token: generateToken(newUser.id),
  };
};

//login user
const loginUser = async (args) => {
  const { username, password } = args;
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
    token: generateToken(user.id),
  };
};

//genarate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  Mutation: {
    async login(_, args) {
      //Login user
      loginUser(args);
    },
    async register(
      _,
      { registerInput: { username, email, password, profileURL } }
    ) {
      //register user
      registerUser({ username, email, password, profileURL });
    },
  },
};
