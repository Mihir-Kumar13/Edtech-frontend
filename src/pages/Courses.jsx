import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Courses = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  // Dummy data for courses
  const dummyCourses = [
    {
      _id: "course1",
      thumbnail:
        "data:image/jpeg;base64,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",
      courseName: "Introduction to React",
      courseDescription: "Learn the basics of React programming.",
      price: 49.99,
      instructor: {
        firstName: "John",
        lastName: "Doe",
      },
    },
    {
      _id: "course2",
      thumbnail:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOUAAACUCAMAAABbaR5AAAAAkFBMVEX43D394T3x1jvMtjzQuTr530LHskDw0z7ErUHv10by1kUAACaRhjcAACj/4D2IfTQAACv/5T3jyj7bw0Hv20v/6EXp0j6MeziWiTdSTzAjJSsxMSu3qEAADy0YHCopLiouLSsgISu8qjk9OjPBskNBPi4QGyxLRy1EQy9zcDT34UxNSTWmmj6rmzdrZC1mYTNzSck/AAABRklEQVR4nO3ZQW+CMBiA4RaoGyLFAkUm4sQ5dU7d//93Y3NHuZkYv73PpQcufdOEtqlSAAAAAAAAAAAAAAAAAAAAAAAAAIB/IBhy74ndUh5G14WFvvfcbkaHpbkufpZUGQ98GVP5YKik8rFQSeVjuVr5mye2Moj7w6v1VeWd3MqnWVIHtnyZz5uFFlsZZMkk8O3yddUlayu5UoXp26bM6rHotewr30fKaCO78rDtdnVkrODKdBK4TTPd7rNYy63s/z7KFHXTbj9MILFS679K51SczaeVxEp9WLjLTpIV2oWfaSGxMuyS46lpT4d9sjquz11bCqy0+blLpsuv3EW7LknbprYCK5WtTrNZXWil82OWTdZGCavUF94Y/zM65413WhtJlcVoSCSnsr+JDBH1hAAAAAAAAAAAAAAAAAAAAAAAAAAAGPANw8ATcD3kOiEAAAAASUVORK5CYII=",
      courseName: "Advanced JavaScript",
      courseDescription: "Master advanced JavaScript concepts.",
      price: 79.99,
      instructor: {
        firstName: "Jane",
        lastName: "Smith",
      },
    },
    // Add more dummy courses as needed
  ];

  // Dummy data for categories
  const dummyCategories = [
    { _id: "cat1", name: "Web Development" },
    { _id: "cat2", name: "Data Science" },
    // Add more dummy categories as needed
  ];

  // Dummy data for category details
  const dummyCategoryDetails = {
    cat1: {
      categoryName: "Web Development",
      description: "Courses related to web development technologies.",
      allCourses: [dummyCourses[0]],
    },
    cat2: {
      categoryName: "Data Science",
      description: "Courses related to data science and analytics.",
      allCourses: [dummyCourses[1]],
    },
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value) {
      toast.success("Category details fetched successfully");
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const renderCourseCard = (course) => (
    <div
      key={course._id}
      className="border rounded-lg p-4 shadow-lg cursor-pointer"
      onClick={() => handleCourseClick(course._id)}
    >
      <img
        src={course.thumbnail}
        alt={course.courseName}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl  mt-2">{course.courseName}</h2>
      <p className="text-white mt-1">{course.courseDescription}</p>
      <p className="text-white mt-1">
        <strong>Price:</strong> Rs{course.price}
      </p>
      <p className="text-gray-700 mt-1">
        <strong>Instructor:</strong>{" "}
        {course.instructor.firstName.charAt(0).toUpperCase() +
          course.instructor.firstName.slice(1).toLowerCase()}{" "}
        {course.instructor.lastName.charAt(0).toUpperCase() +
          course.instructor.lastName.slice(1).toLowerCase()}
      </p>
    </div>
  );

  return (
    <div className="mt-20">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>
      <div>
        <select
          className="bg-zinc-900"
          value={selectedOption}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          {dummyCategories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <p>Selected: {selectedOption}</p>
      </div>
      {selectedOption ? (
        <div>
          <h2 className="text-xl font-semibold mt-4">
            {dummyCategoryDetails[selectedOption].categoryName}
          </h2>
          <p className="text-gray-700 mt-1">
            <strong>Description:</strong>{" "}
            {dummyCategoryDetails[selectedOption].description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dummyCategoryDetails[selectedOption].allCourses.map(
              renderCourseCard
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dummyCourses.map(renderCourseCard)}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Courses;
