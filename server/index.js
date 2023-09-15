require("dotenv").config();
const { createServer } = require("http");
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

// Init App
const app = express();

// Creating a http server with app
const httpServer = createServer(app);

// Initilize Socket
require("./socket/socket")(httpServer);

// Applying Middlewares
app.use(cors());
app.use(express.json());

// Init ApolloServer
const apolloServer = new ApolloServer({
  typeDefs: require("./gql/typeDefs"),
  resolvers: require("./gql/index"),
});

// Starting The Server
apolloServer.start().then(() => {
  app.use(
    expressMiddleware(apolloServer, {
      context: ({ req }) => ({ req }),
    })
  );

  // Listening To the httpserver
  httpServer.listen(process.env.PORT, () =>
    console.log(`http://localhost:${process.env.PORT}`)
  );
});

module.exports = httpServer;
