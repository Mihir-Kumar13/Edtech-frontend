import React from "react";
import { capitalize } from "../constants";

const Coursecard = ({ course, onClick }) => {
  //console.log(course);
  return (
    <div
      onClick={() => onClick(course._id)}
      className="border border-solid bg-zinc-700 p-5 rounded-md m-2"
    >
      <div>
        <img
          src={course.thumbnail}
          alt={course.courseName}
          className="w-full h-[300px] rounded-lg "
        />
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold">{course.courseName}</p>
        <p>
          <strong>
            {" "}
            Instructor:{capitalize(course?.instructor?.firstName)}{" "}
            {capitalize(course?.instructor?.lastName)}
          </strong>
        </p>
      </div>
      <div className="text-white">
        <p>₹{course.price}</p>
      </div>
    </div>
  );
};

export default Coursecard;
