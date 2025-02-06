import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

// GraphQL Mutation to Register User
const REGISTER_USER = gql`
  mutation RegisterUser(
    $name: String!
    $email: String!
    $phone: String!
    $password: String!
  ) {
    registerUser(
      name: $name
      email: $email
      phone: $phone
      password: $password
    ) {
      id
      name
      email
      phone
    }
  }
`;

const NewUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(""); // New state for password
  const [message, setMessage] = useState(""); // For success or error messages

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted: () => {
      setMessage("User created successfully!"); // Display success message
      setName(""); // Clear form fields
      setEmail("");
      setPhone("");
      setPassword(""); // Clear password field
    },
    onError: (err) => {
      console.error("Error creating user:", err); // Log the detailed error
      setMessage("Error creating user, please try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    registerUser({ variables: { name, email, phone, password } });
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && <p>{message}</p>} {/* Show success or error message */}
    </div>
  );
};

export default NewUserForm;
