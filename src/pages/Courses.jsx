import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Courses = () => {
  const courses = useSelector((state) => state.course.courses);
  const category = useSelector((state) => state.course.categories);

  const [selectedOption, setSelectedOption] = useState("");
  const [categoryDetails, setCategoryDetails] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (selectedOption) {
      const fetchCategoryDetails = async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/courses/getCategoryDetails`, // Update with your actual endpoint
            { categoryId: selectedOption },
            { withCredentials: true }
          );
          setCategoryDetails(response.data.data);
          //console.log(response.data.data);

          toast.success("Category details fetched successfully");
        } catch (error) {
          console.error("Error fetching category details:", error);
          toast.error("Failed to fetch category details");
        }
      };

      fetchCategoryDetails();
    }
  }, [selectedOption]);

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>
      {!courses?.length == 0 ? (
        <div className="text-3xl text-center">No courses on Website</div>
      ) : (
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
          {categoryDetails ? (
            <div>
              <h2 className="text-xl font-semibold mt-4">
                {categoryDetails.categoryName}
              </h2>
              <p className="text-gray-700 mt-1">
                <strong>Description:</strong> {categoryDetails.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryDetails.allCourses &&
                  categoryDetails.allCourses.map((course) => (
                    <div
                      key={course._id}
                      className="border rounded-lg p-4 shadow-lg cursor-pointer"
                      onClick={() => handleCourseClick(course._id)}
                    >
                      <img
                        src={course.thumbnail}
                        alt={course.courseName}
                        className="w-full h-48 object-cover rounded"
                      />
                      <h2 className="text-xl font-semibold mt-2">
                        {course.courseName}
                      </h2>
                      <p className="text-gray-700 mt-1">
                        {course.courseDescription}
                      </p>
                      <p className="text-gray-700 mt-1">
                        <strong>Price:</strong> ${course.price}
                      </p>
                      <p className="text-gray-700 mt-1">
                        <strong>Instructor:</strong>{" "}
                        {course.instructor.firstName.charAt(0).toUpperCase() +
                          course.instructor.firstName
                            .slice(1)
                            .toLowerCase()}{" "}
                        {course.instructor.lastName.charAt(0).toUpperCase() +
                          course.instructor.lastName.slice(1).toLowerCase()}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses &&
                courses.map((course) => (
                  <div
                    key={course._id}
                    className="border rounded-lg p-4 shadow-lg cursor-pointer"
                    onClick={() => handleCourseClick(course._id)}
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="w-full h-48 object-cover rounded"
                    />
                    <h2 className="text-xl font-semibold mt-2">
                      {course.courseName}
                    </h2>
                    <p className="text-gray-700 mt-1">
                      {course.courseDescription}
                    </p>
                    <p className="text-gray-700 mt-1">
                      <strong>Price:</strong> ${course.price}
                    </p>
                    <p className="text-gray-700 mt-1">
                      <strong>Instructor:</strong>{" "}
                      {course.instructor.firstName.charAt(0).toUpperCase() +
                        course.instructor.firstName.slice(1).toLowerCase()}{" "}
                      {course.instructor.lastName.charAt(0).toUpperCase() +
                        course.instructor.lastName.slice(1).toLowerCase()}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Courses;
