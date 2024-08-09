import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretDown } from "@fortawesome/free-solid-svg-icons";
import useCourseDetails from "../Hooks/useCourseDetails";
import "../index.css";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const CoursePage = () => {
  const { id } = useParams();
  const { course, loading, error, fetchCourseDetails } = useCourseDetails(id);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedsubSection, setExpandedsubSection] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (course && user) {
      setIsEnrolled(course.studentsEnrolled.includes(user._id));
    }
  }, [course, user]);

  const handleBuyNow = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/payments/buy`,
        { courseId: id },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
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
          name: `${capitalize(user.firstName)} ${capitalize(user.lastName)}`,
          email: user.email,
        },
        notes: { courseId: id },
        theme: { color: "#F37254" },
        handler: function (response) {
          console.log("Payment successful, response:", response);
          fetchCourseDetails();
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

  const handleSectionToggle = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
    setExpandedsubSection(null);
  };

  const handlesubSectionToggle = (sectionId) => {
    setExpandedsubSection(expandedSection === sectionId ? null : sectionId);
  };

  if (loading)
    return (
      <div className="text-center py-20">
        <SkeletonLoader />
      </div>
    );
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!course) return <p className="text-center">No course details found.</p>;

  return (
    <div className="w-[80%] mx-auto py-4 my-20 ">
      <h1 className="text-4xl font-bold text-center mb-8">Course Details</h1>
      <div className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between p-6 bg-zinc-700">
          <div>
            <h1 className="text-3xl font-bold mb-3 text-white">
              {course.courseName}
            </h1>
            {!isEnrolled && (
              <div className="text-gray-300">
                <p className="mb-2">Ratings: {course.ratings}</p>
                <p className="font-semibold">Price: ₹{course.price}</p>
              </div>
            )}
          </div>
          <img
            src={course.thumbnail}
            className="w-56 h-56 object-cover rounded-md mt-4 md:mt-0"
            alt="Course Thumbnail"
          />
        </div>
        <div className="p-6 bg-zinc-600 text-white">
          <h2 className="text-xl font-semibold mb-2">About the Course</h2>
          <p>{course.courseDescription}</p>
          <p className="mt-4">
            Instructor: {capitalize(course.instructor.firstName)}{" "}
            {capitalize(course.instructor.lastName)}
          </p>
          {!isEnrolled && (
            <button
              onClick={handleBuyNow}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Enroll Now
            </button>
          )}
        </div>
        <div className="p-6 bg-zinc-700">
          <h2 className="text-2xl font-bold mb-4 text-white">Course Content</h2>
          {course.courseContent.map((content) => (
            <div key={content._id} className="mb-4">
              <button
                onClick={() => handleSectionToggle(content._id)}
                className="flex justify-between items-center w-full text-left bg-gray-800 text-white p-3 rounded-md hover:bg-gray-700 transition duration-300"
              >
                <span>{content.sectionName}</span>
                <FontAwesomeIcon
                  icon={faSquareCaretDown}
                  className={`transition-transform duration-300 ${expandedSection === content._id ? "transform rotate-180" : ""}`}
                />
              </button>
              {expandedSection === content._id && (
                <div className="pl-6 mt-2 space-y-2">
                  {isEnrolled ? (
                    content.subSection?.map((subsection) => (
                      <div key={subsection._id} className="text-white flex">
                        <div
                          onClick={() => handlesubSectionToggle(subsection._id)}
                          className="flex justify-between items-center w-full text-left bg-gray-800 text-white p-3 rounded-md hover:bg-gray-700 transition duration-300"
                        >
                          <div> {subsection.title} </div>
                          {expandedsubSection === subsection._id && (
                            <div className="transition-height expand ">
                              <video
                                src={subsection.videoUrl}
                                controls
                                className="h-auto w-1/2"
                                aria-label={`Video for ${subsection.title}`}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 italic">
                      Purchase the course to view content
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="p-6 max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md">
    <div className="animate-pulse">
      <div className="bg-gray-700 h-8 w-1/2 rounded mb-4"></div>
      <div className="flex mb-6">
        <div className="bg-gray-700 h-40 w-40 rounded-md mr-4"></div>
        <div className="flex-1">
          <div className="bg-gray-700 h-6 w-3/4 rounded mb-4"></div>
          <div className="bg-gray-700 h-4 w-1/2 rounded mb-2"></div>
          <div className="bg-gray-700 h-4 w-2/3 rounded mb-2"></div>
        </div>
      </div>
      <div>
        <div className="bg-gray-700 h-6 w-full rounded mb-4"></div>
        <div className="bg-gray-700 h-6 w-full rounded mb-4"></div>
        <div className="bg-gray-700 h-6 w-full rounded"></div>
      </div>
    </div>
  </div>
);

export default CoursePage;
