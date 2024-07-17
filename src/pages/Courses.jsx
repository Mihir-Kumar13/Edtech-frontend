import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  let loadingToastId = null;

  useEffect(() => {
    console.log("useEffect called");
    const fetchAllCourses = async () => {
      setLoading(true);
      loadingToastId = toast.info("Loading courses...");
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/courses/showallcourses"
        );
        console.log("Response data:", response.data);
        if (loadingToastId !== null) {
          toast.dismiss(loadingToastId);
        }
        toast.success("Courses fetched successfully");
        setCourses(response.data.data);
      } catch (error) {
        toast.error("Error fetching courses: " + error.message);
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCourses();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
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
      )}
      <ToastContainer />
    </div>
  );
};

export default Courses;
