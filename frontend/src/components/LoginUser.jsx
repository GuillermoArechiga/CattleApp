import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    const query = `
      mutation {
        loginUser(email: "${credentials.email}", password: "${credentials.password.trim()}") {
          token
        }
      }
    `;  
    try {
      const response = await axios.post("http://localhost:4000/graphql", {
        query: query,
      });
    
      if (response.data.errors) {
        setError("Invalid email or password");
        return;
      }
  
      localStorage.setItem("token", response.data.data.loginUser.token); // Store JWT in localStorage
      alert("Login successful!");
      setError(null); // Reset error on successful login
    } catch (error) {
      console.error("Login error", error);
      setError("Login failed. Please try again later.");
    }
  };

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Show error message */}
    </div>
  );
};

export default Login;
