import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Coursecard from "../components/Coursecard";

import { useNavigate } from "react-router";
import { fetchCurrentUser } from "../constants";

const Enrolledcourses = () => {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    fetchCurrentUser();
  }, []);
  const navigate = useNavigate();
  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };
  const user = useSelector((state) => state.auth.user);
  const enrolledCourseIds = user.courses;

  // Get all courses from the Redux store
  const courses = useSelector((state) => state.course.courses);

  // Filter courses to only include those that match the enrolled course IDs
  const enrolledCourses = courses?.filter((course) =>
    enrolledCourseIds.includes(course._id)
  );

  console.log(enrolledCourses);
  return (
    <div className="items-start">
      {enrolledCourses.length === 0 ? (
        <div className="text-6xl">No courses enrolled</div>
      ) : (
        <div className="text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrolledCourses.map((course, index) => (
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

export default Enrolledcourses;
