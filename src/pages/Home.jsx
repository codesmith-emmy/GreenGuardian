// Home.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-screen-lg mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center font-bold text-3xl text-green-700 mb-6">
        Welcome to Smart Plant Care Assistant
      </h1>
      <p className="text-lg text-center text-gray-800 font-medium mb-8">
        Your personal AI-powered assistant for healthy, thriving plants. Get
        personalized care tips and real-time health assessments to help your
        plants flourish.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <button
          onClick={() => navigate("/get-started")}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/learn-more")}
          className="bg-white text-green-600 border-2 border-green-600 font-bold py-3 px-6 rounded-md hover:bg-green-100"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Home;
