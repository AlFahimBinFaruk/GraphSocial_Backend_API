const { ApolloServer } = require("apollo-server");
const {PubSub}=require("graphql-subscriptions")
const dotenv = require("dotenv").config();

//get DB
const connectDB = require("./config/db");
const typeDefs = require("./graphQL/typeDefs");
const resolvers = require("./graphQL/resolvers");

//conntect the db
connectDB();

const pubsub = new PubSub();
const PORT = process.env.post || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});
//listen app
server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
