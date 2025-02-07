import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./authContext";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const { logout } = useAuth();

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
          <ul className="hidden md:flex space-x-6">
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
            <li>
              {/* Log out option */}
              <button
                onClick={logout}
                className="hover:text-gray-300 transition"
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
              <li>
                {/* Mobile Log out option */}
                <button
                  onClick={logout}
                  className="hover:text-gray-300 transition"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;