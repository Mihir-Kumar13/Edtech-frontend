import React from "react";
import { useSelector } from "react-redux";

const Enrolledcourses = () => {
  const user = useSelector((state) => state.auth.user);
  const enrolledcourses = user.courses;
  return (
    <div className="items-start">
      {enrolledcourses.length === 0 ? (
        <div className="text-6xl">No courses enrolled</div>
      ) : (
        <div>
          {enrolledcourses.map((course) => (
            <div key={course._id}>{course.courseName}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Enrolledcourses;
