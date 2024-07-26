import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Buycourse = () => {
  const { id } = useParams();

  useEffect(() => {
    const buyCourse = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/payments/buy`,
          { courseId: id },
          { withCredentials: true }
        );
        console.log(response);
        console.log("Purchase successful:", response.data.data);
      } catch (error) {
        console.error(
          "Error purchasing course:",
          error,
          error.response ? error.response.data.message : error.message
        );
      }
    };

    buyCourse();
  }, [id]);

  return (
    <div className="w-[80%] mx-auto py-4 my-20">
      Processing your purchase...
    </div>
  );
};

export default Buycourse;
