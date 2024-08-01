import React from "react";
import logo from "../assets/home-illustration.svg";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row mx-auto mt-10 px-4 md:px-8">
      <div className="flex flex-col w-full md:w-1/2 mt-10 text-center md:text-left">
        <span className="text-3xl md:text-5xl font-bold leading-tight">
          Crack Placements with
          <br />
          India’s top Coders
        </span>

        {!user && (
          <div className="flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4 mt-10">
            <button
              onClick={() => navigate("/courses")}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              View Courses
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold py-3 px-6 rounded shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              Become Instructor
            </button>
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <img
          src={logo}
          alt="home"
          className="w-full h-auto max-w-sm md:max-w-full"
        />
      </div>
    </div>
  );
};

export default HeroSection;
