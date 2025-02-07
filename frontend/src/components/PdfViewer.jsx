import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Set the worker source for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

const PdfViewer = ({ file, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Dynamically adjust the scale based on the container's width
    const containerWidth = document.querySelector('.pdf-container')?.offsetWidth;
    if (containerWidth) {
      const desiredWidth = containerWidth - 40; 
      setScale(desiredWidth / 600);
    }
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-400 bg-opacity-90">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[90vh] relative flex flex-col">
        {/* Close button and title */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">PDF Viewer</h2>
          <button
            onClick={onClose}
            className="bg-red-400 text-white px-2 py-1 rounded-full"
          >
            X
          </button>
        </div>

        {/* PDF content */}
        <div className="overflow-y-auto flex-grow mb-4 pdf-container">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              pageNumber={pageNumber}
              scale={scale} // Control page scale based on container width
              className="shadow-lg mx-auto"
            />
          </Document>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={pageNumber === 1}
          >
            Previous
          </button>
          <span className="text-sm">
            Page {pageNumber} of {numPages}
          </span>
          <button
            onClick={() =>
              setPageNumber((prev) => (prev < numPages ? prev + 1 : prev))
            }
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={pageNumber >= numPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;