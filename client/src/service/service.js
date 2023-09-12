import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5050/",
  cache: new InMemoryCache(),
});

export default client;
