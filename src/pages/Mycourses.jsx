import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Coursecard from "../components/Coursecard";

const Mycourses = () => {
  const navigate = useNavigate();
  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };
  const user = useSelector((state) => state.auth.user);
  const enrolledCourses = user.courses;

  console.log(enrolledCourses);
  return (
    <div className="items-start">
      {enrolledCourses?.length === 0 ? (
        <div className="text-6xl">No courses Published</div>
      ) : (
        <div className="text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrolledCourses?.map((course, index) => (
            <Coursecard
              key={index}
              course={course}
              onClick={handleCourseClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Mycourses;
