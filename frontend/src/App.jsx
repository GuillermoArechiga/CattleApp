import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient"; // Import the Apollo Client
import NewUserForm from "./components/NewUser"; // Import the form component

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>GraphQL User Form</h1>
        <NewUserForm />
      </div>
    </ApolloProvider>
  );
};

export default App;