const { ApolloServer } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
//get DB
const connectDB = require("./config/db");
const typeDefs = require("./graphQL/typeDefs");
const resolvers = require("./graphQL/resolvers");

//conntect the db
connectDB();
//
app.use([cors()]);

const pubsub = new PubSub();
const PORT = process.env.PORT || 5000;

async function startApolloServer() {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({ req, pubsub }),
    });
    await server.start();
    server.applyMiddleware({ app });

    //listen app
    app.listen(PORT, () =>
      console.log(`http://localhost:${PORT}${server.graphqlPath}`)
    );
  } catch (error) {
    console.log(error);
  }
}

//start the apollo server
startApolloServer();
