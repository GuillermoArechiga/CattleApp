import { createRoot } from 'react-dom/client'
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import './index.css'
import App from './App.jsx'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Make sure this matches your backend URL
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
