import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Courses = () => {
  const courses = useSelector((state) => state.course.courses);

  const [selectedOption, setSelectedOption] = useState("");

  const category = useSelector((state) => state.course.categories);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>
      <div>
        <div>
          <select
            className="bg-zinc-900"
            value={selectedOption}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            {category &&
              category.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
          <p>Selected: {selectedOption}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses &&
            courses.map((course) => (
              <div key={course._id} className="border rounded-lg p-4 shadow-lg">
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="w-full h-48 object-cover rounded"
                />
                <h2 className="text-xl font-semibold mt-2">
                  {course.courseName}
                </h2>
                <p className="text-gray-700 mt-1">{course.courseDescription}</p>
                <p className="text-gray-700 mt-1">
                  <strong>Price:</strong> ${course.price}
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Instructor:</strong> {course.instructor}
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Category:</strong> {course.category}
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Created At:</strong>{" "}
                  {new Date(course.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
        </div>
      </div>
      )
      <ToastContainer />
    </div>
  );
};

export default Courses;
