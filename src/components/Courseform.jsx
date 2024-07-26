import React, { useState } from "react";
import axios from "axios";

const CourseForm = () => {
  const [course, setCourse] = useState({
    courseName: "",
    courseDescription: "",
    whatYouWillLearn: "",
    price: "",
    category: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState([]);
  const [state, setState] = useState(1); // Managing the stepwise state

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

  const addSection = () => {
    setSections([...sections, { sectionName: "", courseId: "" }]);
  };

  const handleSectionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSections = sections.map((section, idx) =>
      idx === index ? { ...section, [name]: value } : section
    );
    setSections(updatedSections);
  };

  const addSubsection = (sectionIndex) => {
    setSubsections([
      ...subsections,
      { sectionId: sectionIndex, title: "", description: "" },
    ]);
  };

  const handleSubsectionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSubsections = subsections.map((subsection, idx) =>
      idx === index ? { ...subsection, [name]: value } : subsection
    );
    setSubsections(updatedSubsections);
  };

  const createCourse = async () => {
    try {
      const formData = new FormData();
      formData.append("thumbnail", thumbnail);
      for (const key in course) {
        formData.append(key, course[key]);
      }

      const courseResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/courses/create-course`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const courseData = courseResponse.data.data;
      const courseId = courseData.id;

      for (const section of sections) {
        const sectionResponse = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/courses/create-section`,
          { ...section, courseId },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const sectionData = sectionResponse.data.data;
        const sectionId = sectionData.id;

        for (const subsection of subsections.filter(
          (sub) => sub.sectionId === sections.indexOf(section)
        )) {
          await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/courses/create-subsection`,
            { ...subsection, sectionId },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="text-black w-[75%] mx-auto">
      {state === 1 && (
        <div className="flex flex-col w-[75%] mx-auto">
          <h1>Create a Course</h1>
          <input
            name="courseName"
            placeholder="Course Name"
            value={course.courseName}
            onChange={handleCourseChange}
          />
          <input
            name="courseDescription"
            placeholder="Course Description"
            value={course.courseDescription}
            onChange={handleCourseChange}
          />
          <input
            name="whatYouWillLearn"
            placeholder="What You Will Learn"
            value={course.whatYouWillLearn}
            onChange={handleCourseChange}
          />
          <input
            name="price"
            placeholder="Price"
            value={course.price}
            onChange={handleCourseChange}
          />
          <input
            name="category"
            placeholder="Category"
            value={course.category}
            onChange={handleCourseChange}
          />
          <input
            type="file"
            name="thumbnail"
            onChange={handleThumbnailChange}
          />
          <button onClick={() => setState(2)}>Next</button>
        </div>
      )}

      {state === 2 && (
        <div>
          <h2>Sections</h2>
          {sections.map((section, index) => (
            <div key={index}>
              <input
                name="sectionName"
                placeholder="Section Name"
                value={section.sectionName}
                onChange={(e) => handleSectionChange(index, e)}
              />
              <button onClick={() => addSubsection(index)}>
                Add Subsection
              </button>
              {subsections
                .filter((sub) => sub.sectionId === index)
                .map((subsection, subIndex) => (
                  <div key={subIndex}>
                    <input
                      name="title"
                      placeholder="Subsection Title"
                      value={subsection.title}
                      onChange={(e) => handleSubsectionChange(subIndex, e)}
                    />
                    <input
                      name="description"
                      placeholder="Subsection Description"
                      value={subsection.description}
                      onChange={(e) => handleSubsectionChange(subIndex, e)}
                    />
                  </div>
                ))}
            </div>
          ))}
          <button onClick={addSection}>Add Section</button>
          <button onClick={() => setState(1)}>Previous</button>
          <button onClick={() => setState(3)}>Next</button>
        </div>
      )}

      {state === 3 && (
        <div>
          <h2>Review & Submit</h2>
          <button onClick={() => setState(2)}>Previous</button>
          <button onClick={createCourse}>Create Course</button>
        </div>
      )}
    </div>
  );
};

export default CourseForm;
