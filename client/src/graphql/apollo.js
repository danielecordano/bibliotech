import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === "development",
  link: new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT })
});

export default client;