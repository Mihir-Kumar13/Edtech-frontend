import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { capitalize, fetchCurrentUser } from "../constants";

const Coursepage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [timer, setTimer] = useState(15); // 15 seconds timer
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

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

  useEffect(() => {
    if (redirecting) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);

            navigate(`/dashboard/enrolledcourses`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown); // Cleanup interval on component unmount
    }
  }, [redirecting, navigate]);

  const handleBuyNow = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/payments/buy`,
        { courseId: id },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { paymentResponse, courseName, courseDescription, thumbnail } =
        response.data.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: paymentResponse.amount,
        currency: paymentResponse.currency,
        name: courseName,
        description: courseDescription,
        image: thumbnail,
        order_id: paymentResponse.id,

        prefill: {
          name: capitalize(user.firstName) + capitalize(user.lastName),
          email: user.email,
        },
        notes: {
          courseId: id,
        },
        theme: {
          color: "#F37254",
        },
        handler: function () {
          setRedirecting(true);
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal closed");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error during payment process:", error);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <div className="w-[80%] mx-auto py-4 my-20">
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
                <strong>Instructor:</strong>{" "}
                {`${capitalize(course.instructor.firstName)} ${capitalize(course.instructor.lastName)}`}
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
            {redirecting && (
              <div className="mt-4 text-center text-white">
                <p>Redirecting you in {timer} seconds...</p>
              </div>
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
