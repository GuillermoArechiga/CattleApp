import React from "react";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 font-playfair">
          {" "}
          {/* Use the custom font name */}
          Unlocking the Power of Modern Web Development
        </h1>

        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6">
          {" "}
          {/* Flexbox for responsiveness */}
          {/* Koa.js Card */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shadow-md p-6 transition duration-300 transform hover:scale-105 hover:shadow-lg w-full md:w-1/4">
            {" "}
            {/* Width adjustments */}
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              Koa.js
            </h2>
            <p className="text-gray-700">
              Experience the next generation of Node.js frameworks. Koa.js
              offers a smaller, more expressive, and robust foundation for your
              web applications.
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-700">
              <li>Lightweight and performant</li>
              <li>Enhanced control over request flow</li>
              <li>Easier to maintain and debug</li>
            </ul>
          </div>
          {/* GraphQL Card */}
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg shadow-md p-6 transition duration-300 transform hover:scale-105 hover:shadow-lg w-full md:w-1/4">
            {" "}
            {/* Width adjustments */}
            <h2 className="text-2xl font-semibold mb-4 text-purple-800">
              GraphQL
            </h2>
            <p className="text-gray-700">
              Revolutionize your API interactions with GraphQL. Fetch exactly
              the data you need, nothing more, nothing less.
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-700">
              <li>Efficient data fetching</li>
              <li>Type safety and validation</li>
              <li>Improved developer experience</li>
            </ul>
          </div>
          {/* Apollo Card */}
          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg shadow-md p-6 transition duration-300 transform hover:scale-105 hover:shadow-lg w-full md:w-1/4">
            {" "}
            {/* Width adjustments */}
            <h2 className="text-2xl font-semibold mb-4 text-green-800">
              Apollo
            </h2>
            <p className="text-gray-700">
              Streamline your GraphQL integration with Apollo. Benefit from
              caching, state management, and tooling.
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-700">
              <li>Simplified data management</li>
              <li>Powerful caching mechanisms</li>
              <li>Seamless integration with React</li>
            </ul>
          </div>
          {/* React Card */}
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg shadow-md p-6 transition duration-300 transform hover:scale-105 hover:shadow-lg w-full md:w-1/4">
            {" "}
            {/* Width adjustments */}
            <h2 className="text-2xl font-semibold mb-4 text-yellow-800">
              React
            </h2>
            <p className="text-gray-700">
              Build dynamic and interactive user interfaces with React, a
              powerful JavaScript library.
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-700">
              <li>Component-based architecture</li>
              <li>Declarative programming</li>
              <li>Large and active community</li>
            </ul>
          </div>
          {/* MongoDB Card */}
          <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-lg shadow-md p-6 transition duration-300 transform hover:scale-105 hover:shadow-lg w-full md:w-1/4">
            {" "}
            {/* Width adjustments */}
            <h2 className="text-2xl font-semibold mb-4 text-red-800">
              MongoDB
            </h2>
            <p className="text-gray-700">
              Store and manage your data efficiently with MongoDB, a NoSQL
              document database.
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-700">
              <li>Flexible schema</li>
              <li>Scalable and performant</li>
              <li>Easy to use</li>
            </ul>
          </div>
        </div>

        {/* Call to Action (Optional) */}
        <div className="text-center mt-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
