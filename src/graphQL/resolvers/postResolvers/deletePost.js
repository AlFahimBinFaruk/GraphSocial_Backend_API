const { AuthenticationError } = require("apollo-server-express");

const Post = require("../../../models/Post");
const checkAuth = require("../../../utils/checkAuth");

module.exports = {
  Mutation: {
    async deletePost(_, { postId }, context) {
      const user = await checkAuth(context);
      try {
        const post = await Post.findById(postId);
        //objectId type have to be converted into string before comparing..
        if (user._id.toString() === post.user.toString()) {
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
