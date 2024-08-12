import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setStep } from "../Store/formSlice";
import axios from "axios";
import { FaPlus, FaArrowRight } from "react-icons/fa";
import Nestedview from "./Nestedview";
import { useNavigate } from "react-router";

const SecondSection = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nextError, setNextError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const course = useSelector((state) => state.form.course);

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    setNextError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/courses/create-section`,
        { sectionName: data.sectionName, courseId: course._id },
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(setCourse(response.data.data));
        reset();
      }
    } catch (err) {
      setError("Failed to create section. Please try again.");
    }
    setLoading(false);
  };

  const handleNext = () => {
    if (!course?.courseContent || course.courseContent.length === 0) {
      setNextError("At least one section is required");
    } else {
      setNextError("");
      navigate(`/courses/${course._id}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-6">Course Sections</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="mb-4">
          <label htmlFor="sectionName" className="block text-white mb-2">
            Section Name
          </label>
          <input
            id="sectionName"
            placeholder="Enter section name"
            {...register("sectionName", {
              required: "Section name is required",
            })}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.sectionName && (
            <span className="text-red-500 text-sm mt-1">
              {errors.sectionName.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300"
        >
          {loading ? (
            <span className="animate-spin mr-2">&#9696;</span>
          ) : (
            <FaPlus className="mr-2" />
          )}
          Create Section
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {course?.courseContent?.length > 0 && <Nestedview />}

      <div className="flex flex-col items-end">
        {nextError && <p className="text-red-500 mb-2">{nextError}</p>}
        <button
          onClick={handleNext}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300"
        >
          Next
          <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SecondSection;
