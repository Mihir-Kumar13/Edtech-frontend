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
import { useNavigate } from "react-router";

const Sidebar = () => {
  const student = useSelector((state) => state.auth.user?.accountType);

  const status = student === "Student" ? true : false;
  const navigate = useNavigate();

  return (
    <div className="w-20 sm:w-28 md:w-52 lg:w-64 h-screen py-16 text-white  px-6  flex flex-col items-start text-lg  shadow-lg ">
      {" "}
      <div
        className="hover:cursor-pointer hover:bg-gray-800 w-full"
        onClick={() => navigate("/dashboard/myprofile")}
      >
        <FontAwesomeIcon icon={faUser} className=" mr-4" />
        My Profile
      </div>
      <div className="flex-col flex items-start w-full  ">
        {/* gcfhbjklhgbjkl
        
        */}

        {status ? (
          <>
            <div
              className="hover:cursor-pointer hover:bg-gray-800 w-full"
              onClick={() => navigate("/dashboard/enrolledcourses")}
            >
              <FontAwesomeIcon icon={faGraduationCap} className="mr-3 " />
              Enrolled Courses
            </div>
            <div className="hover:cursor-pointer hover:bg-gray-800 w-full">
              <FontAwesomeIcon icon={faClockRotateLeft} className="mr-4" />
              Purchase History
            </div>
            <div className="hover:cursor-pointer hover:bg-gray-800 w-full">
              <FontAwesomeIcon icon={faCartShopping} className="mr-3" /> Cart
            </div>
          </>
        ) : (
          <>
            <div className="hover:cursor-pointer hover:bg-gray-800 w-full">
              <FontAwesomeIcon icon={faGauge} className="mr-3 " />
              Dashboard
            </div>
            <div
              className="hover:cursor-pointer hover:bg-gray-800 w-full"
              onClick={() => navigate("/dashboard/mycourses")}
            >
              <FontAwesomeIcon icon={faDesktop} className="mr-4" />
              My Courses
            </div>
            <div className="hover:cursor-pointer hover:bg-gray-800 w-full">
              <FontAwesomeIcon icon={faPlus} className="mr-3" /> Add Course
            </div>
          </>
        )}
      </div>
      <br />
      <div className="flex flex-col items-start   w-full ">
        <div
          className="hover:cursor-pointer hover:bg-gray-800 w-full"
          onClick={() => navigate("/dashboard/setting")}
        >
          <FontAwesomeIcon icon={faGear} className="mr-3" /> Settings
        </div>
        <div className="hover:cursor-pointer hover:bg-gray-800 w-full">
          <FontAwesomeIcon icon={faRightFromBracket} className=" mr-4" />
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
