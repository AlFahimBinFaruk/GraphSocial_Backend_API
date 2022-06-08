const Post = require("../../../models/Post");
const checkAuth = require("../../../utils/checkAuth");

module.exports = {
  Mutation: {
    async createPost(_, { body }, context) {
      const user = await checkAuth(context);
      //create new post
      if (body.trim() === "") {
        throw new Error("Post body must not be empty");
      }
      const newPost = await Post.create({
        body,
        user: user.id,
      });

      context.pubsub.publish("NEW_POST", {
        newPost,
      });

      return newPost;
    },
  },
};
