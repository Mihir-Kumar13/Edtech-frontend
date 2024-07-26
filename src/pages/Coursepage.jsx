import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Coursepage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  //console.log(id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/courses/get-course`,
          { courseId: id }
        );
        setCourse(response.data.data);
        // Check if user is enrolled (dummy check here, replace with real check)
        setIsEnrolled(
          response.data.data.studentsEnrolled.includes("currentUserId")
        );
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleBuyNow = () => {
    navigate("/buy-course/" + id);
    // Handle the buy now action
    console.log("Redirect to purchase page or initiate purchase process.");
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <div className="w-[80%] mx-auto py-4 my-20  ">
      <h1 className="text-4xl font-bold text-center mb-10">Course Detail</h1>
      {course ? (
        <div className="container mx-auto p-4 shadow-md rounded-lg">
          <div className="flex flex-col md:flex-row">
            <img
              src={course.thumbnail}
              alt={`${course.courseName} Thumbnail`}
              className="w-full md:w-1/3 rounded-lg shadow-md object-cover"
            />
            <div className="md:ml-8 mt-4 md:mt-0">
              <h1 className="text-3xl font-bold mb-2">{course.courseName}</h1>
              <p className="text-gray-700 mb-4">{course.courseDescription}</p>
              <p>
                <strong>Instructor:</strong>
                {course.instructor.firstName.charAt(0).toUpperCase() +
                  course.instructor.firstName.slice(1).toLowerCase()}{" "}
                {course.instructor.lastName.charAt(0).toUpperCase() +
                  course.instructor.lastName.slice(1).toLowerCase()}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Course Content</h2>
            <ul>
              {course.courseContent.map((section, index) => (
                <li key={index} className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {section.sectionName}
                  </h3>
                  <ul className="pl-4">
                    {section.subSection.map((subSection, subIndex) => (
                      <li key={subIndex} className="mb-4">
                        <h4 className="text-lg font-medium">
                          {subSection.title}
                        </h4>
                        <p className="text-gray-600">
                          {subSection.description}
                        </p>
                        <p className="text-gray-600">
                          Duration: {subSection.timeduration} minutes
                        </p>
                        <a
                          href={subSection.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          Watch Video
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <p>
              <strong>Price:</strong> ₹{course.price}
            </p>
            <p>
              <strong>Ratings:</strong>{" "}
              {course.ratings.length > 0
                ? (
                    course.ratings.reduce((acc, rating) => acc + rating, 0) /
                    course.ratings.length
                  ).toFixed(1)
                : "No ratings yet"}
            </p>
            <p>
              <strong>Students Enrolled:</strong>{" "}
              {course.studentsEnrolled.length}
            </p>
            {!isEnrolled && (
              <button
                onClick={handleBuyNow}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                Buy Now
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center">No course details found.</p>
      )}
    </div>
  );
};

export default Coursepage;
