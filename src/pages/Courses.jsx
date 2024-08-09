import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Coursecard from "../components/Coursecard";

const Courses = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const courses = useSelector((state) => state.course.courses);
  const categories = useSelector((state) => state.course.categories);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryDetails, setCategoryDetails] = useState(null);

  const filteredCourses = courses?.filter(
    (course) => !user?.courses?.includes(course?._id)
  );

  const handleCourseClick = useCallback(
    (courseId) => {
      navigate(`/courses/${courseId}`);
    },
    [navigate]
  );

  const handleCategoryChange = useCallback((event) => {
    setSelectedCategory(event.target.value);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchCategoryDetails = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/courses/getCategoryDetails`,
            { categoryId: selectedCategory },
            { withCredentials: true }
          );
          setCategoryDetails(response.data.data);
          toast.success("Category details fetched successfully");
        } catch (error) {
          console.error("Error fetching category details:", error);
          toast.error("Failed to fetch category details");
        }
      };

      fetchCategoryDetails();
    }
  }, [selectedCategory]);

  return (
    <div className="mt-24 container mx-auto px-4 h-screen">
      <h1 className="text-3xl font-bold mb-8 text-white">Explore Courses</h1>
      {courses?.length === 0 ? (
        <div className="text-3xl text-center text-gray-400">
          No courses available
        </div>
      ) : (
        <div>
          <div className="mb-8">
            <select
              className="w-full md:w-64 bg-gray-800 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          {categoryDetails ? (
            <div>
              <h2 className="text-2xl font-semibold mt-4 mb-2 text-white">
                {categoryDetails.categoryName}
              </h2>
              <p className="text-gray-400 mb-6">
                {categoryDetails.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {categoryDetails.allCourses
                  ?.filter((course) => !user?.courses?.includes(course?._id))
                  .map((course) => (
                    <Coursecard
                      key={course._id}
                      course={course}
                      onClick={handleCourseClick}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredCourses?.map((course) => (
                <Coursecard
                  key={course._id}
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
