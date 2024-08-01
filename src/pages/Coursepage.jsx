import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { capitalize } from "../constants";
import { faSquareCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Coursepage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [timer, setTimer] = useState(10); // 10 seconds timer
  const [expandedSection, setExpandedSection] = useState(null); // State for accordion
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
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  useEffect(() => {
    if (course && user) {
      const isUserEnrolled = course.studentsEnrolled.includes(user._id);
      setIsEnrolled(isUserEnrolled);
    }
  }, [course, user]);

  useEffect(() => {
    if (redirecting) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            navigate(`/courses/${id}`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown); // Cleanup interval on component unmount
    }
  }, [redirecting, navigate, id]);

  const handleBuyNow = async () => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }

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
          name: capitalize(user.firstName) + " " + capitalize(user.lastName),
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

  const handleSectionToggle = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <div className="w-[80%] mx-auto py-4 my-20 relative">
      {redirecting && (
        <div className="absolute top-[40%] left-[40%] px-16 z-50 py-4 bg-zinc-600 rounded-lg">
          Redirecting you in {timer}
        </div>
      )}
      <h1 className="md:text-4xl font-bold text-center">Course Detail</h1>
      {course ? (
        <div className="container mx-auto shadow-md rounded-lg relative">
          <div className="flex flex-col md:flex-row justify-between bg-zinc-700">
            <div className="mt-4 p-4">
              <h1 className="text-4xl font-bold mb-3">{course.courseName}</h1>
              {!isEnrolled && (
                <h5 className="text-lg font-semibold">
                  Ratings: {course?.ratings}
                </h5>
              )}
              {!isEnrolled ? (
                <p className="mt-2">
                  <strong>Price: {course.price}</strong>
                </p>
              ) : null}
            </div>
            <div className="p-2">
              <img
                src={course.thumbnail}
                className="rounded-md size-56 mx-auto"
                alt="Course Thumbnail"
              />
            </div>
          </div>
          <div className="bg-zinc-700 p-4 mt-4 flex flex-col md:flex-row items-center justify-between">
            <div className="md:text-lg mt-2">
              {!isEnrolled && <h2>About Course: {course.courseDescription}</h2>}
              <h2>
                Instructor:{" "}
                {capitalize(course.instructor.firstName) +
                  " " +
                  capitalize(course.instructor.lastName)}
              </h2>
            </div>
            <div className="">
              {!isEnrolled ? (
                <button
                  onClick={() => handleBuyNow()}
                  className="mr-4 md:text-lg bg-blue-500 rounded-md hover:bg-blue-700 text-white font-bold my-4 py-2 px-4 space-x-2"
                >
                  Buy Now
                </button>
              ) : null}
            </div>
          </div>
          <div className="bg-zinc-700 p-4 mt-4">
            <h1 className="md:text-5xl font-bold">Course Module</h1>
            {course?.courseContent?.map((content) => (
              <div key={content._id} className="mx-auto mt-4">
                <button
                  onClick={() => handleSectionToggle(content._id)}
                  className=" flex justify-between  w-full text-left bg-gray-800 text-white p-2 rounded-md"
                >
                  {content.sectionName}
                  <p className="mx-4">
                    <FontAwesomeIcon icon={faSquareCaretDown} />
                  </p>
                </button>

                {expandedSection === content._id && (
                  <div className="pl-4">
                    {isEnrolled ? (
                      content.subSection?.map((subsection) => (
                        <div key={subsection._id} className="mb-2">
                          <div className="">
                            <h2>{subsection.title}</h2>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-white">
                        Please Purchase the course for Content{" "}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center">No course details found.</p>
      )}
    </div>
  );
};

export default Coursepage;
