import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./authContext";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Get login function from context

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({ ...prevData, [name]: value }));
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
        query,
      });

      if (response.data.errors) {
        setError("Invalid email or password");
        return;
      }

      const token = response.data.data.loginUser.token;
      login(token); // Call login function from AuthContext
    } catch (error) {
      console.error("Login error", error);
      setError("Login failed. Please try again later.");
    }
  };

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <input type="email" name="email" value={credentials.email} onChange={handleInputChange} placeholder="Email" required />
        <input type="password" name="password" value={credentials.password} onChange={handleInputChange} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;