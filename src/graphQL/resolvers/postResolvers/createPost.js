const Post = require("../../../models/Post");
const checkAuth = require("../../../utils/checkAuth");

module.exports = {
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      //create new post
      if (body.trim() === "") {
        throw new Error("Post body must not be empty");
      }
      const newPost = new Post.create({
        body,
        user: user.id,
        username: user.username,
      });

      context.pubsub.publish("NEW_POST", {
        newPost,
      });

      return newPost;
    },
  },
};
