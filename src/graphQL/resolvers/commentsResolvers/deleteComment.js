const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const checkAuth = require("../../../utils/checkAuth");
const Post = require("../../../models/Post");

module.exports = {
  Mutation: {
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = await checkAuth(context);
      //delete comment
      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};
