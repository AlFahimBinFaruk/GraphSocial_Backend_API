const { AuthenticationError, UserInputError } = require("apollo-server");
const checkAuth = require("../../utils/checkAuth");
const Post = require("../../models/Post");

const createComment = async (postId, username, body) => {
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
};

const deleteComment = async (postId, username, commentId) => {
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
};

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      //create new comment
      createComment(postId, username, body);
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);
      //delete comment
      deleteComment(postId, username, commentId);
    },
  },
};
