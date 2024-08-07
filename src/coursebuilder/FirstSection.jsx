import React from "react";

const FirstSection = ({
  handleThumbnailChange,
  handleCourseChange,
  handleChange,
  setState,
  course,
  selectedOption,
  category,
  createCourse,
}) => {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-800 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Create a Course
      </h1>
      <form className="space-y-6">
        <input
          className="w-full px-4 py-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="courseName"
          placeholder="Course Name"
          value={course.courseName}
          onChange={handleCourseChange}
        />
        <textarea
          className="w-full px-4 py-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="courseDescription"
          placeholder="Course Description"
          value={course.courseDescription}
          onChange={handleCourseChange}
          rows="4"
        />
        <textarea
          className="w-full px-4 py-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="whatYouWillLearn"
          placeholder="What You Will Learn"
          value={course.whatYouWillLearn}
          onChange={handleCourseChange}
          rows="4"
        />
        <input
          className="w-full px-4 py-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="price"
          placeholder="Price"
          value={course.price}
          onChange={handleCourseChange}
          type="number"
        />
        <select
          className="w-full px-4 py-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedOption}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {category &&
            category.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              name="thumbnail"
              onChange={handleThumbnailChange}
            />
          </label>
        </div>
        <button
          className="w-full py-3 text-lg bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
          onClick={(e) => {
            e.preventDefault();
            createCourse();
          }}
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default FirstSection;
