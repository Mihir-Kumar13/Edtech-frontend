import React from "react";
import { useSelector } from "react-redux";

const Mycourses = () => {
  const user = useSelector((state) => state.auth.user);
  const mycourses = user.courses;
  console.log(mycourses);
  return (
    <div className="items-start">
      {mycourses.length === 0 ? (
        <div className="text-6xl">No courses Published</div>
      ) : (
        <div>
          {mycourses.map((course) => (
            <div key={course._id}>{course.courseName}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Mycourses;
