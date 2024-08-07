import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FirstSection from "../coursebuilder/FirstSection";
import SecondSection from "../coursebuilder/SecondSection";

const CourseForm = () => {
  const [courseid, setCourseId] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [course, setCourse] = useState({
    courseName: "",
    courseDescription: "",
    whatYouWillLearn: "",
    price: "",
  });
  const [published, setPublished] = useState(true);
  const [thumbnail, setThumbnail] = useState(null);
  const [state, setState] = useState(1); // Managing the stepwise state
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const category = useSelector((state) => state.course.categories);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handlePublish = (e) => {
    setPublished(e.target.value === "true");
  };

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: value,
    });
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const createCourse = async () => {
    try {
      setLoader(true);
      setError(null);
      const formData = new FormData();
      formData.append("thumbnail", thumbnail);
      for (const key in course) {
        formData.append(key, course[key]);
      }
      formData.append("category", selectedOption);

      const courseResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/courses/create-course`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setCourseId(courseResponse.data.data._id);
      setLoader(false);
      setState(2);
    } catch (error) {
      setLoader(false);
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Error in creating course. Please check all fields."
      );
      console.error("Error creating course:", error);
    }
  };

  const publishCourse = async () => {
    try {
      setLoader(true);
      setError(null);
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/courses/${courseid}/publish`,
        { published },
        { withCredentials: true }
      );
      setLoader(false);
      navigate("/instructor/courses"); // Redirect to instructor courses page
    } catch (error) {
      setLoader(false);
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Error in publishing course. Please try again."
      );
      console.error("Error publishing course:", error);
    }
  };

  if (loader) return <div>Processing...</div>;

  return (
    <div className="w-[75%] text-white mx-auto">
      {state === 1 && (
        <FirstSection
          handleThumbnailChange={handleThumbnailChange}
          handleCourseChange={handleCourseChange}
          handleChange={handleChange}
          setState={setState}
          course={course}
          selectedOption={selectedOption}
          createCourse={createCourse}
          category={category}
        />
      )}

      {state === 2 && <SecondSection courseid={courseid} />}

      {state === 3 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Publish Course</h2>
          <div>
            <label className="block mb-2">Publish Status:</label>
            <select
              className="bg-zinc-700 w-full px-2 py-2 rounded-md"
              value={published.toString()}
              onChange={handlePublish}
            >
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <button
              className="w-1/4 text-lg bg-blue-500 rounded-md hover:bg-blue-700 text-white font-bold py-2 px-4"
              onClick={() => setState(2)}
            >
              Previous
            </button>
            <button
              className="w-1/4 text-lg bg-green-500 rounded-md hover:bg-green-700 text-white font-bold py-2 px-4"
              onClick={publishCourse}
            >
              Finish & Publish
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default CourseForm;
