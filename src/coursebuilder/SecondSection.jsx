import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const SecondSection = ({ courseid }) => {
  const [sections, setSections] = useState([]);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSubsectionTitles, setNewSubsectionTitles] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/sections/${courseid}`,
        { withCredentials: true }
      );
      setSections(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error("Failed to fetch sections:", error);
      toast.error("Failed to fetch sections");
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  const createSection = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/courses/create-section`,
        { sectionName: newSectionTitle, courseId: courseid },
        { withCredentials: true }
      );
      setSections((prevSections) => [
        ...prevSections,
        { ...response.data.data, subsections: [] },
      ]);
      setNewSectionTitle("");
      toast.success("Section created successfully");
    } catch (error) {
      console.error("Failed to create section:", error);
      toast.error("Failed to create section");
    }
  };

  const createSubsection = async (sectionId) => {
    const subsectionTitle = newSubsectionTitles[sectionId] || "";
    if (!subsectionTitle) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/courses/create-subsection`,
        {
          title: subsectionTitle,
          description: "", // You might want to add a description field in your UI
          sectionId: sectionId,
        },
        { withCredentials: true }
      );

      setSections((prevSections) =>
        prevSections.map((section) =>
          section._id === sectionId
            ? {
                ...section,
                subsections: [
                  ...(section.subsections || []),
                  response.data.data,
                ],
              }
            : section
        )
      );

      setNewSubsectionTitles((prev) => ({ ...prev, [sectionId]: "" }));
      toast.success("Subsection added successfully");
    } catch (error) {
      console.error("Failed to add subsection:", error);
      toast.error("Failed to add subsection");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-white mt-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4">Create New Section</h2>
      <input
        type="text"
        value={newSectionTitle}
        onChange={(e) => setNewSectionTitle(e.target.value)}
        placeholder="Enter section title"
        className="w-full p-2 mb-2 text-black"
      />
      <button onClick={createSection} className="bg-blue-500 p-2 rounded">
        Create Section
      </button>

      <h2 className="text-2xl font-bold mt-8 mb-4">Sections</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {Array.isArray(sections) &&
        sections.map((section) => (
          <div key={section._id} className="mb-8 p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">
              {section.sectionName}
            </h3>
            {Array.isArray(section.subsections) &&
              section.subsections.map((subsection) => (
                <div
                  key={subsection._id}
                  className="ml-4 mt-2 p-4 bg-gray-700 rounded-md"
                >
                  {subsection.title}
                </div>
              ))}
            <input
              type="text"
              value={newSubsectionTitles[section._id] || ""}
              onChange={(e) =>
                setNewSubsectionTitles((prev) => ({
                  ...prev,
                  [section._id]: e.target.value,
                }))
              }
              placeholder="Enter subsection title"
              className="w-full p-2 mt-2 text-black"
            />
            <button
              onClick={() => createSubsection(section._id)}
              className="bg-green-500 p-1 rounded mt-2"
            >
              Add Subsection
            </button>
          </div>
        ))}
    </div>
  );
};

export default SecondSection;
