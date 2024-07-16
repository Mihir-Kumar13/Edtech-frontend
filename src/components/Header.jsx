import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/4CxDWZ01.svg";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 shadow-[0_4px_6px_-1px_rgba(255,255,255,0.5),_0_2px_4px_-2px_rgba(255,255,255,0.3)]">
      <header className="flex items-center justify-between text-white p-[2px] text-lg shadow-lg w-[85%] mx-auto">
        <Link to="/">
          <img src={logo} className="invert-color size-24" alt="logo" />
        </Link>

        <nav className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
        <div>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Started
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
