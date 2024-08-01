import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/4CxDWZ01.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeUser } from "../Store/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faRightFromBracket,
  faUser,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigatefxn = () => {
    navigate("/");
  };

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/logout`,
        {}, // Empty object for data payload
        { withCredentials: true } // Configuration object to include credentials (cookies)
      );
      navigate("/");
      dispatch(removeUser());
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error sending OTP. Please try again.";
      toast.error(errorMessage);
    }
  };

  const user = useSelector((state) => state.auth.user);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 shadow-[0_4px_6px_-1px_rgba(255,255,255,0.5),_0_2px_4px_-2px_rgba(255,255,255,0.3)]">
      <header className="flex flex-wrap items-center justify-between text-white p-4 text-lg shadow-lg w-full mx-auto">
        <Link to="/">
          <img src={logo} className="invert-color size-24" alt="logo" />
        </Link>

        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="text-white text-2xl">
            <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
          </button>
        </div>

        <nav
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:space-x-4 absolute lg:relative top-16 left-0 right-0 bg-zinc-900 lg:bg-transparent lg:top-0 lg:relative`}
        >
          <Link to="/" className="block p-2">
            Home
          </Link>
          <Link to="/courses" className="block p-2">
            Courses
          </Link>
          <Link to="/about" className="block p-2">
            About Us
          </Link>
          <Link to="/contact" className="block p-2">
            Contact Us
          </Link>
        </nav>

        <div>
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Get Started
            </button>
          ) : (
            <div className="flex items-center">
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2"
              >
                DashBoard
              </button>
              <div className="relative inline-block text-left ml-3">
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <span className="flex items-center justify-center text-white font-bold rounded-full bg-zinc-700 size-14">
                    <img src={user.image} alt="user" />
                  </span>
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
                {dropdownOpen && (
                  <div className="absolute mt-2 w-32 bg-zinc-800 border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="py-1" role="menu">
                      <button
                        onClick={navigatefxn}
                        className="text-white block px-4 py-2 text-sm hover:bg-zinc-700 hover:text-gray-900 w-full text-left"
                      >
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        {user.firstName.charAt(0).toUpperCase() +
                          user.firstName.slice(1).toLowerCase()}{" "}
                        {user.lastName.charAt(0).toUpperCase() +
                          user.lastName.slice(1).toLowerCase()}
                      </button>

                      <button
                        onClick={() => handleLogout()}
                        className="block px-4 py-2 text-sm hover:bg-zinc-700 hover:text-gray-900 w-full text-left"
                      >
                        Logout
                        <FontAwesomeIcon
                          icon={faRightFromBracket}
                          className="ml-2"
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
      <ToastContainer />
    </div>
  );
};

export default Header;
