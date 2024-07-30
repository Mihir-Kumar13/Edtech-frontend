import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Coursecard from "../components/Coursecard";

const Courses = () => {
  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const userCourses = useSelector((state) => state.auth.user.courses);

  const courses = useSelector((state) => state.course.courses);

  console.log(userCourses);
  console.log(courses);
  const filteredCourses = courses?.filter(
    (course) => !userCourses.includes(course?._id)
  );

  ///courses
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
            `${import.meta.env.VITE_BACKEND_URL}/courses/getCategoryDetails`, // Update with your actual endpoint
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

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>
      {courses?.length == 0 ? (
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
                  categoryDetails.allCourses
                    ?.filter((course) => !userCourses.includes(course?._id))
                    .map((course, index) => (
                      <Coursecard
                        key={index}
                        course={course}
                        onClick={handleCourseClick}
                      />
                    ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses &&
                filteredCourses.map((course, index) => (
                  <Coursecard
                    key={index}
                    course={course}
                    onClick={handleCourseClick}
                  />
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
