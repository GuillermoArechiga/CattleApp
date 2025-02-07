import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql", // Your GraphQL endpoint
});

const authLink = setContext(() => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "", // Attach token to every request
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain authLink before httpLink
  cache: new InMemoryCache(),
});

export default client;