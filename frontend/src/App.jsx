import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import client from "./apolloClient"; // Import the Apollo Client
import NewUserForm from "./components/NewUser";
import Login from "./components/LoginUser";
import Home from "./components/Home";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log(isAuthenticated);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      console.log("tokenAuth:", token)
      if (token) {
        try {
          const response = await fetch("http://localhost:4000/verify-token", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Send token in Authorization header
              "Content-Type": "application/json",
            },
          });

          console.log(response)

          if (response.ok) {
            setIsAuthenticated(true); // User is authenticated
          } else {
            setIsAuthenticated(false); // Token is invalid
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          setIsAuthenticated(false); // Handle error
        }
      } else {
        setIsAuthenticated(false); // No token, user not authenticated
      }
    };

    checkAuth();
  }, []);

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <h1>GraphQL User Form</h1>

          <Routes>
            <Route
              path="/register"
              element={isAuthenticated ? <Navigate to="/" /> : <NewUserForm />}
            />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
