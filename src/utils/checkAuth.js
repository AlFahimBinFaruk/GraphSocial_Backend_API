const { AuthenticationError } = require("apollo-server-express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const checkAuth = async (context) => {
  // context = { ... headers }
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        //verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //get user creds from the token
        const user = await User.findById(decoded.id).select("-profileURL");
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};

module.exports = checkAuth;
