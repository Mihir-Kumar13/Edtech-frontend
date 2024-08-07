import React from "react";
import { capitalize } from "../constants";

const Coursecard = ({ course, onClick }) => {
  const discountPercentage = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  return (
    <div
      onClick={() => onClick(course._id)}
      className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl cursor-pointer max-w-sm"
    >
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.courseName}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {course.courseName}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {capitalize(course?.instructor?.firstName)}{" "}
          {capitalize(course?.instructor?.lastName)}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-400">
              ₹{course.price}
            </span>
            {course.originalPrice && (
              <span className="text-gray-500 line-through ml-2">
                ₹{course.originalPrice}
              </span>
            )}
          </div>
          {discountPercentage > 0 && (
            <span className="bg-green-600 text-white text-sm font-semibold px-2 py-1 rounded">
              {discountPercentage}% off
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coursecard;
