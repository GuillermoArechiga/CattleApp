import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./authContext";
import { useQuery, gql } from "@apollo/client";

// Define the query to fetch the user info (me)
const GET_ME = gql`
  query GetMe {
    me {
      id
      name
      email
      phone
    }
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();

  // Fetch user info using the GET_ME query
  const { data, loading, error } = useQuery(GET_ME, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming the token is in localStorage
      },
    },
  });

  // Toggle the mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo Section */}
        <div className="text-xl font-bold">
          <span>GuillermoCode .</span>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="hidden md:flex space-x-6 items-center">
            <li>
              <Link to="#home" className="hover:text-gray-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="#about" className="hover:text-gray-300 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="#services" className="hover:text-gray-300 transition">
                Services
              </Link>
            </li>
            <li>
              <Link to="#contact" className="hover:text-gray-300 transition">
                Contact
              </Link>
            </li>

            {/* Show user info if available */}
            {loading ? (
              <li>
                <span className="text-white">Loading...</span>
              </li>
            ) : error ? (
              <li>
                <span className="text-white">Error loading user info</span>
              </li>
            ) : (
              data &&
              data.me && (
                <li>
                  <span className="text-white">{`Hello, ${data.me.name}`}</span>
                </li>
              )
            )}

            {/* Log out option */}
            <li>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Log Out
              </button>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              className="text-white"
              aria-label="Open menu"
              onClick={toggleMenu} // Toggle menu visibility
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu (hidden by default, shown when `isMenuOpen` is true) */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-blue-600 bg-opacity-90 text-white flex flex-col space-y-6 p-6">
            {/* Close Button */}
            <button
              className="text-white text-3xl absolute top-6 right-6"
              onClick={toggleMenu} // Close the menu
            >
              &times;
            </button>

            {/* Menu Links */}
            <ul className="flex flex-col text-3xl space-y-4">
              <li>
                <Link to="#home" className="hover:text-gray-300 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="#about" className="hover:text-gray-300 transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="#services" className="hover:text-gray-300 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link to="#contact" className="hover:text-gray-300 transition">
                  Contact
                </Link>
              </li>

              {/* Mobile Log out option */}
              <button
                onClick={logout}
                className="hover:text-gray-300 transition"
              >
                Log Out
              </button>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
