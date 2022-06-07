const { AuthenticationError } = require("apollo-server");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const checkAuth = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            //verify
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //get user creds from the token
            req.user = await User.findById(decoded.id).select("-profileURL");
            next();
        } catch (error) {
            throw new AuthenticationError("Not Authorized");
        }
    }
    //if token is not provided..
    if (!token) {
        throw new AuthenticationError("Not Autorized and no Token Given.");
    }
});

module.exports = checkAuth;