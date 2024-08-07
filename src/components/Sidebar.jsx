import {
  faCartShopping,
  faClockRotateLeft,
  faDesktop,
  faGauge,
  faGear,
  faGraduationCap,
  faPlus,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const isStudent = user?.accountType === "Student";
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { icon: faUser, text: "My Profile", path: "/dashboard/myprofile" },
    ...(isStudent
      ? [
          {
            icon: faGraduationCap,
            text: "Enrolled Courses",
            path: "/dashboard/enrolledcourses",
          },
          {
            icon: faClockRotateLeft,
            text: "Purchase History",
            path: "/dashboard/purchasehistory",
          },
          { icon: faCartShopping, text: "Cart", path: "/dashboard/cart" },
        ]
      : [
          { icon: faGauge, text: "Dashboard", path: "/dashboard" },
          { icon: faDesktop, text: "My Courses", path: "/dashboard/mycourses" },
          { icon: faPlus, text: "Add Course", path: "/dashboard/addcourse" },
        ]),
    { icon: faGear, text: "Settings", path: "/dashboard/setting" },
    { icon: faRightFromBracket, text: "Logout", path: "/logout" },
  ];

  const handleNavigation = (path) => {
    if (path === "/logout") {
      // Handle logout logic here
      console.log("Logging out...");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="w-20 sm:w-28  md:w-52 lg:w-64 h-screen bg-gradient-to-b from-gray-900 to-black text-white py-6 px-4 flex flex-col shadow-lg">
      <div className="flex items-center justify-center mb-8"></div>
      <nav className="flex-1">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
              location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "hover:bg-zinc-700"
            } ${index > 0 && index === sidebarItems.length - 2 ? "mt-auto" : ""}`}
            onClick={() => handleNavigation(item.path)}
          >
            <FontAwesomeIcon icon={item.icon} className="w-5 h-5 mr-4" />
            <span className="hidden md:inline">{item.text}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
