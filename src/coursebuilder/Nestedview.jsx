import React, { useState, useCallback } from "react";
import { RxDropdownMenu } from "react-icons/rx";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { setCourse } from "../Store/formSlice";
import axios from "axios";

const SubsectionForm = ({ sectionId, onSubmit, loading }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmitForm = (data) => {
    onSubmit(data, reset);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="mt-4 space-y-2">
      <input
        {...register("subsectionTitle", { required: true })}
        placeholder="Subsection Title"
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="file"
        accept="video/*"
        {...register("subsectionVideo", { required: true })}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 transition duration-300 ease-in-out"
      >
        {loading ? "Creating..." : "Create Subsection"}
      </button>
    </form>
  );
};

const Subsection = ({ subsection }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 text-left focus:outline-none"
      >
        <span className="font-medium text-gray-700 text-white">
          {subsection.title}
        </span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && (
        <div className="px-4 py-2">
          <video controls className="w-full max-w-2xl mx-auto">
            <source src={subsection.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

const Nestedview = () => {
  const course = useSelector((state) => state.form.course);
  const dispatch = useDispatch();
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateSubsection = useCallback((sectionId) => {
    setActiveSectionId((prevId) => (prevId === sectionId ? null : sectionId));
  }, []);

  const onSubmitSubsection = useCallback(
    async (data, reset) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("sectionId", activeSectionId);
      formData.append("title", data.subsectionTitle);
      formData.append("video", data.subsectionVideo[0]);
      formData.append("description", "This is a description");

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/courses/create-subsection`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          dispatch(setCourse(response.data.data));
          setActiveSectionId(null);
          reset();
        }
      } catch (error) {
        console.error("Error creating subsection:", error);
      } finally {
        setLoading(false);
      }
    },
    [activeSectionId, dispatch]
  );

  return (
    <div className="space-y-4 max-w-4xl mx-auto text-white ">
      {course?.courseContent?.map((section) => (
        <details key={section._id} className="bg-gray-800 shadow-md rounded-lg">
          <summary className="px-4 py-3 cursor-pointer focus:outline-none">
            <div className="flex items-center gap-x-3">
              <RxDropdownMenu className="text-gray-500 text-white" />
              <p className="font-medium text-gray-700 text-white">
                {section.sectionName}
              </p>
            </div>
          </summary>
          <div className="px-4 py-2 space-y-2 bg-gray-800 text-white">
            {section?.subSection?.map((subsection) => (
              <Subsection key={subsection._id} subsection={subsection} />
            ))}
            <button
              onClick={() => handleCreateSubsection(section._id)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              {activeSectionId === section._id ? "Cancel" : "Add Subsection"}
            </button>
            {activeSectionId === section._id && (
              <SubsectionForm
                sectionId={section._id}
                onSubmit={onSubmitSubsection}
                loading={loading}
              />
            )}
          </div>
        </details>
      ))}
    </div>
  );
};

export default Nestedview;
