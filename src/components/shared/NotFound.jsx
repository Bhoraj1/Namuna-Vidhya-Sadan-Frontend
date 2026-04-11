import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-900 via-blue-800 to-slate-900 text-white px-4">
      <div className="text-center max-w-xl">
        {/* 404 Text */}
        <h1 className="text-7xl sm:text-8xl font-extrabold bg-linear-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent mb-6">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Page Not Found</h2>

        <p className="text-gray-300 mb-8">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-primary-color rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
          >
            <FaHome />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
