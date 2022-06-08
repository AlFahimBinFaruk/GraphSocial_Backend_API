const { AuthenticationError } = require("apollo-server-express");

const Post = require("../../../models/Post");
const checkAuth = require("../../../utils/checkAuth");

module.exports = {
  Mutation: {
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
