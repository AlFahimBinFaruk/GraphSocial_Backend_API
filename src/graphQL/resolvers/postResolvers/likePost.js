const { UserInputError } = require("apollo-server-express");

const Post = require("../../../models/Post");
const checkAuth = require("../../../utils/checkAuth");

module.exports = {
  Mutation: {
    async likePost(_, { postId }, context) {
      const { username } = await checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // Post already likes, unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // Not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
  },
};
