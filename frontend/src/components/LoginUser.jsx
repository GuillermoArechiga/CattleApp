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

    try {
      // Send POST request to /login route
      const response = await axios.post("http://localhost:4000/login", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if response contains a token
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store JWT in localStorage
        alert("Login successful!");
        setError(null); // Reset error on successful login
      } else {
        setError("Login failed. Invalid email or password.");
      }
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