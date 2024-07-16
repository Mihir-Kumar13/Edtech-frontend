// src/components/Footer.js
import React from "react";
import logo from "../assets/4CxDWZ01.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white  mt-4 shadow-[0_4px_6px_-1px_rgba(255,255,255,0.5),_0_2px_4px_-2px_rgba(255,255,255,0.3)]">
      <div className="container mx-auto flex justify-between ">
        <div>
          <Link to="/">
            <img src={logo} className="invert-color size-24" alt="logo" />
          </Link>
          <p className="mt-2">© 2024 EdTech, Inc. All rights reserved.</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold">Follow Us</h3>
          <div className="flex space-x-2">
            <a
              href="https://www.facebook.com"
              className="text-blue-500 hover:text-blue-700"
            >
              Facebook
            </a>
            <a
              href="https://www.twitter.com"
              className="text-blue-500 hover:text-blue-700"
            >
              Twitter
            </a>
            <a
              href="https://www.linkedin.com"
              className="text-blue-500 hover:text-blue-700"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
