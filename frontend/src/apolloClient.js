// apolloClient.js
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;