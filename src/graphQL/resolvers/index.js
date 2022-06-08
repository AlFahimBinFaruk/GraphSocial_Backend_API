const loginResolver = require("./userResolvers/login");
const registerResolver = require("./userResolvers/register");
const subscriptionsResolver = require("./postResolvers/subscription");
const getPostResolver = require("./postResolvers/getPost");
const getPostsResolver = require("./postResolvers/getPosts");
const createPostResolver = require("./postResolvers/createPost");
const likePostResolver = require("./postResolvers/likePost");
const deletePostResolver = require("./postResolvers/deletePost");
module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...getPostResolver.Query,
    ...getPostsResolver.Query,
  },
  Mutation: {
    ...loginResolver.Mutation,
    ...registerResolver.Mutation,
    ...createPostResolver.Mutation,
    ...likePostResolver.Mutation,
    ...deletePostResolver.Mutation,
  },
  Subscription: {
    ...subscriptionsResolver.Subscription,
  },
};
