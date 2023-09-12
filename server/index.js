require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

// Init App
const app = express();

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
  app.listen(process.env.PORT, () =>
    console.log(`http://localhost:${process.env.PORT}`)
  );
});
