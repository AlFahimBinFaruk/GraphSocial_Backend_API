const { gql } = require("apollo-server-express");
//these are the things that we can query
module.exports = gql`
  type PostList {
    posts: [Post]
    totalPostCount: Int!
  }
  type Post {
    id: ID!
    body: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    profileURL: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    profileURL: String!
    password: String!
  }

  type Query {
    getPosts(pageNo: String): PostList
    getPost(postId: ID!): Post
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`;
