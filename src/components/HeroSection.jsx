import React from "react";
import logo from "../assets/home-illustration.svg";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  return (
    <div className="flex mx-auto mt-20">
      <div className="flex flex-col w-1/2 mt-10 mx-auto">
        <span className="text-5xl font-bold">
          Crack Placements with
          <br />
          India’s top Coders
        </span>

        {!user && (
          <div className="flex space-x-4 mt-10 w-[75%]">
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

      <div className="w-1/2">
        <img src={logo} alt="home" />
      </div>
    </div>
  );
};

export default HeroSection;
