import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faPlay,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import useCourseDetails from "../Hooks/useCourseDetails";
import "../index.css";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const CoursePage = () => {
  const { id } = useParams();
  const { course, loading, error, fetchCourseDetails } = useCourseDetails(id);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedSubSection, setExpandedSubSection] = useState(null);
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
    setExpandedSubSection(null);
  };

  const handleSubSectionToggle = (sectionId) => {
    setExpandedSubSection(expandedSubSection === sectionId ? null : sectionId);
  };

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorDisplay message={error} />;
  if (!course) return <EmptyState message="No course details found." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row justify-between p-6 md:p-10">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              {course.courseName}
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              {course.courseDescription}
            </p>
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2" />
              <span className="text-white">{course.ratings} / 5.0</span>
            </div>
            <p className="text-lg text-gray-300">
              Instructor: {capitalize(course.instructor.firstName)}{" "}
              {capitalize(course.instructor.lastName)}
            </p>
          </div>
          <div className="md:w-1/3 mt-6 md:mt-0">
            <img
              src={course.thumbnail}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
              alt="Course Thumbnail"
            />
            {!isEnrolled && (
              <div className="mt-6 text-center">
                <p className="text-3xl font-bold text-white mb-4">
                  ₹{course.price}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBuyNow}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300"
                >
                  Enroll Now
                </motion.button>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 md:p-10 bg-gray-800">
          <h2 className="text-3xl font-bold mb-6 text-white">Course Content</h2>
          <AnimatePresence>
            {course.courseContent.map((content) => (
              <motion.div
                key={content._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <button
                  onClick={() => handleSectionToggle(content._id)}
                  className="flex justify-between items-center w-full text-left bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  <span className="text-lg font-semibold">
                    {content.sectionName}
                  </span>
                  <motion.div
                    animate={{
                      rotate: expandedSection === content._id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FontAwesomeIcon icon={faChevronDown} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedSection === content._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pl-6 mt-2 space-y-2"
                    >
                      {isEnrolled ? (
                        content.subSection?.map((subsection) => (
                          <motion.div
                            key={subsection._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-700 rounded-lg overflow-hidden"
                          >
                            <button
                              onClick={() =>
                                handleSubSectionToggle(subsection._id)
                              }
                              className="flex justify-between items-center w-full text-left text-white p-3 hover:bg-gray-600 transition duration-300"
                            >
                              <div className="flex items-center">
                                <FontAwesomeIcon
                                  icon={faPlay}
                                  className="mr-3 text-blue-400"
                                />
                                <span>{subsection.title}</span>
                              </div>
                              <motion.div
                                animate={{
                                  rotate:
                                    expandedSubSection === subsection._id
                                      ? 180
                                      : 0,
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <FontAwesomeIcon icon={faChevronDown} />
                              </motion.div>
                            </button>
                            <AnimatePresence>
                              {expandedSubSection === subsection._id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="p-4"
                                >
                                  <video
                                    src={subsection.videoUrl}
                                    controls
                                    className="w-full rounded-lg shadow-lg"
                                    aria-label={`Video for ${subsection.title}`}
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-gray-400 italic p-4 bg-gray-700 rounded-lg">
                          Purchase the course to view content
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="animate-pulse bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-6 md:p-10">
        <div className="bg-gray-700 h-12 w-3/4 rounded-lg mb-4"></div>
        <div className="bg-gray-700 h-6 w-1/2 rounded-lg mb-4"></div>
        <div className="bg-gray-700 h-6 w-1/3 rounded-lg mb-4"></div>
        <div className="bg-gray-700 h-64 w-full rounded-lg"></div>
      </div>
      <div className="p-6 md:p-10 bg-gray-800">
        <div className="bg-gray-700 h-8 w-1/3 rounded-lg mb-6"></div>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-700 h-16 w-full rounded-lg mb-4"
          ></div>
        ))}
      </div>
    </div>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
      <p className="font-bold">Error</p>
      <p>{message}</p>
    </div>
  </div>
);

const EmptyState = ({ message }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
    <div className="bg-gray-100 p-6 rounded-lg">
      <p className="text-xl text-gray-600">{message}</p>
    </div>
  </div>
);

export default CoursePage;
