import React, { useState } from "react";
import Navbar from "./Navbar";
import PdfViewer from "./PdfViewer";

const techData = [
  {
    name: "Koa.js",
    color: "from-blue-100 to-blue-200",
    textColor: "text-blue-800",
    description: "Experience the next generation of Node.js frameworks.",
    benefits: [
      "Lightweight and performant",
      "Enhanced control over request flow",
      "Easier to maintain and debug",
    ],
    pdf: "/pdfs/koa.pdf",
  },
  {
    name: "GraphQL",
    color: "from-purple-100 to-purple-200",
    textColor: "text-purple-800",
    description: "Revolutionize your API interactions with GraphQL.",
    benefits: [
      "Efficient data fetching",
      "Type safety and validation",
      "Improved developer experience",
    ],
    pdf: "/pdfs/graphql.pdf",
  },
  {
    name: "Apollo",
    color: "from-green-100 to-green-200",
    textColor: "text-green-800",
    description: "Streamline your GraphQL integration with Apollo.",
    benefits: [
      "Simplified data management",
      "Powerful caching mechanisms",
      "Seamless integration with React",
    ],
    pdf: "/pdfs/apollo.pdf",
  },
  {
    name: "React",
    color: "from-yellow-100 to-yellow-200",
    textColor: "text-yellow-800",
    description: "Build dynamic and interactive user interfaces with React.",
    benefits: [
      "Component-based architecture",
      "Declarative programming",
      "Large and active community",
    ],
    pdf: "/pdfs/react.pdf",
  },
  {
    name: "MongoDB",
    color: "from-red-100 to-red-200",
    textColor: "text-red-800",
    description: "Store and manage your data efficiently with MongoDB.",
    benefits: [
      "Flexible schema",
      "Scalable and performant",
      "Easy to use",
    ],
    pdf: "/pdfs/mongodb.pdf",
  },
];

const Home = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 font-playfair">
          Unlocking the Power of Modern Web Development
        </h1>

        <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
          {techData.map((tech) => (
            <div
              key={tech.name}
              className={`bg-gradient-to-br ${tech.color} rounded-lg shadow-md p-6 transition duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer`}
              onClick={() => setSelectedPdf(tech.pdf)}
            >
              <h2 className={`text-2xl font-semibold mb-4 ${tech.textColor}`}>
                {tech.name}
              </h2>
              <p className="text-gray-700">{tech.description}</p>
              <ul className="list-disc pl-6 mt-4 text-gray-700">
                {tech.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Show PdfViewer if a PDF is selected */}
      {selectedPdf && <PdfViewer file={selectedPdf} onClose={() => setSelectedPdf(null)} />}
    </div>
  );
};

export default Home;