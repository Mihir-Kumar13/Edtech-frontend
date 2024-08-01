import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useCourseDetails = (id) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourseDetails = useCallback(async () => {
    console.log("Fetching course details for ID:", id);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/courses/get-course`,
        { courseId: id }
      );
      console.log("Course details fetched:", response.data.data);
      setCourse(response.data.data);
    } catch (error) {
      console.error("Error fetching course details:", error);
      setError(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  return { course, loading, error, fetchCourseDetails };
};

export default useCourseDetails;
