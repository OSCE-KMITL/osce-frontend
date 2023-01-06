import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { API_URI } from "../../constants";

const http_link = new HttpLink({
  uri: `${API_URI}/graphql`,
});
const client = new ApolloClient({
  link: http_link,
  cache: new InMemoryCache(),
});

export default client;
