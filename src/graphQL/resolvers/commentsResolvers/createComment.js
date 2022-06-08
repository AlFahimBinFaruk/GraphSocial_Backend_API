const { UserInputError } = require("apollo-server-express");
const checkAuth = require("../../../utils/checkAuth");
const Post = require("../../../models/Post");

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const user = await checkAuth(context);
      //create new comment
      if (body.trim() === "") {
        throw new UserInputError("empty comment", {
          errors: {
            body: "comment cannot be empty",
          },
        });
      }

      const post = await Post.findById(postId);
      if (post) {
        await post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("post not found");
      }
    },
  },
};
