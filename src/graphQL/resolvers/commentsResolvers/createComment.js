const { UserInputError } = require("apollo-server-express");
const checkAuth = require("../../../utils/checkAuth");
const Post = require("../../../models/Post");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
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
        post.comments.unshift({
          body,
          username,
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
