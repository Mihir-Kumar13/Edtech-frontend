import React from "react";

const FirstSection = ({
  handleThumbnailChange,
  handleCourseChange,
  handleChange,
  setState,
  course,
  selectedOption,
  category,
}) => {
  return (
    <div className="flex flex-col gap-4 w-[60%] mx-auto">
      <h1 className="text-2xl font-bold">Create a Course</h1>
      <input
        className="bg-zinc-700 w-full px-2 py-2 rounded-md mt-2"
        name="courseName"
        placeholder="Course Name"
        value={course.courseName}
        onChange={handleCourseChange}
      />
      <input
        className="bg-zinc-700 w-full px-2 py-2 rounded-md mt-2"
        name="courseDescription"
        placeholder="Course Description"
        value={course.courseDescription}
        onChange={handleCourseChange}
      />
      <input
        className="bg-zinc-700 w-full px-2 py-2 rounded-md mt-2"
        name="whatYouWillLearn"
        placeholder="What You Will Learn"
        value={course.whatYouWillLearn}
        onChange={handleCourseChange}
      />
      <input
        className="bg-zinc-700 w-full px-2 py-2 rounded-md mt-2"
        name="price"
        placeholder="Price"
        value={course.price}
        onChange={handleCourseChange}
      />
      <div>
        <select
          className="bg-zinc-700 w-full px-2 py-2 rounded-md mt-2"
          value={selectedOption}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          {category &&
            category.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>

      <input
        className="bg-zinc-700 w-full px-2 py-2 rounded-md mt-2"
        type="file"
        name="thumbnail"
        onChange={handleThumbnailChange}
      />
      <button
        className="  w-1/6 mr-4 text-lg bg-blue-500 rounded-md hover:bg-blue-700 text-white font-bold my-4 py-2 px-4 space-x-2"
        onClick={() => setState(2)}
      >
        Next
      </button>
    </div>
  );
};

export default FirstSection;
