import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import logo from "../assets/4CxDWZ01.svg";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
      navigate("/");
      dispatch(removeUser());
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error logging out. Please try again.";
      toast.error(errorMessage);
    }
  }, [navigate, dispatch]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-900 to-black shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              className="w-10 h-10 md:w-12 md:h-12 invert"
              alt="Logo"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm lg:text-base text-white hover:text-blue-400 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-1 px-2 md:py-2 md:px-4 rounded-lg transition-colors duration-200"
              >
                Get Started
              </button>
            ) : (
              <div className="flex items-center space-x-2 md:space-x-4">
                <button
                  onClick={() => navigate("/dashboard/myprofile")}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-1 px-2 md:py-2 md:px-4 rounded-lg transition-colors duration-200"
                >
                  Dashboard
                </button>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-1 focus:outline-none"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                  >
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                    />
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className="text-white text-sm md:text-base"
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <button
                        onClick={() => navigate("/")}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        <span>{`${user.firstName} ${user.lastName}`}</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FontAwesomeIcon
                          icon={faRightFromBracket}
                          className="mr-2"
                        />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <FontAwesomeIcon
              icon={mobileMenuOpen ? faTimes : faBars}
              className="text-xl"
            />
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 bg-gray-800 rounded-b-lg">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block py-2 px-4 text-white hover:bg-gray-700 transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
      <ToastContainer />
    </header>
  );
};

export default Header;
