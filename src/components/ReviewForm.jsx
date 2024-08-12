// ReviewForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ReviewForm = ({ courseId }) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/courses/create-review`,
        { courseId, rating, review },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Review submitted successfully:", response.data);
      // Optionally, you can update the UI or show a success message here
      setRating(5);
      setReview("");
    } catch (error) {
      console.error("Error submitting review:", error);
      // Optionally, you can show an error message to the user here
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-white">Leave a Review</h2>
      <form onSubmit={handleReviewSubmit} className="space-y-4">
        <div>
          <label htmlFor="rating" className="block text-white mb-2">
            Rating (1-5)
          </label>
          <input
            type="number"
            id="rating"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="review" className="block text-white mb-2">
            Review
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            rows="4"
            required
          ></textarea>
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit Review
        </motion.button>
      </form>
    </div>
  );
};

export default ReviewForm;
