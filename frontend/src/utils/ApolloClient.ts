import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch";

const Client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/fel-developers/partycles",
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default Client;
