import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setStep } from "../Store/formSlice";

const FirstSection = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const { editCourse, course } = useSelector((state) => state.form);
  const { categories } = useSelector((state) => state.course);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editCourse) {
      setValue("courseName", course.courseName);
      setValue("courseDescription", course.courseDescription);
      setValue("price", course.price);
      setValue("category", course.category);
      setThumbnail(course.thumbnail);
    }
  }, [editCourse, course, setValue]);

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    if (!thumbnail) {
      alert("Please select a thumbnail image");
      return;
    }

    const formData = new FormData();
    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("thumbnail", thumbnail);

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/courses/create-course`,
        formData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Course created successfully:", response.data.data);
        dispatch(setCourse(response.data.data));
        dispatch(setStep(2));
      }
    } catch (error) {
      console.error("Error creating course:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="courseName"
            className="block mb-2 text-sm font-medium"
          >
            Course Name
          </label>
          <input
            id="courseName"
            placeholder="Enter Course Name"
            {...register("courseName", { required: "Course name is required" })}
            className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.courseName && (
            <span className="text-red-400 text-sm">
              {errors.courseName.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="courseDescription"
            className="block mb-2 text-sm font-medium"
          >
            Course Description
          </label>
          <textarea
            id="courseDescription"
            placeholder="Enter Course Description"
            {...register("courseDescription", {
              required: "Course description is required",
            })}
            className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            rows="4"
          />
          {errors.courseDescription && (
            <span className="text-red-400 text-sm">
              {errors.courseDescription.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block mb-2 text-sm font-medium">
            Price
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter Price"
            {...register("price", { required: "Price is required", min: 0 })}
            className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.price && (
            <span className="text-red-400 text-sm">{errors.price.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block mb-2 text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            defaultValue={editCourse ? course.category : ""}
            {...register("category", { required: "Category is required" })}
            className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a category</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-400 text-sm">
              {errors.category.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="thumbnail" className="block mb-2 text-sm font-medium">
            Thumbnail Image
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors duration-300"
            >
              {!thumbnail ? (
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
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-lg group">
                  <img
                    src={URL.createObjectURL(thumbnail)}
                    alt="thumbnail"
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                </div>
              )}
              <Controller
                name="thumbnail"
                control={control}
                defaultValue=""
                rules={{ required: "Thumbnail is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      field.onChange(e);
                      handleThumbnailChange(e);
                    }}
                  />
                )}
              />
            </label>
          </div>
          {errors.thumbnail && (
            <span className="text-red-400 text-sm">
              {errors.thumbnail.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
          disabled={loading}
        >
          {editCourse ? "Update Course" : "Create Course"}
        </button>
      </form>
    </div>
  );
};

export default FirstSection;
