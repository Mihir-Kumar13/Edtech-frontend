import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const Buycourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const buyCourse = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/payments/buy`,
          { courseId: id },
          { withCredentials: true }
        );

        const { paymentResponse, courseName, courseDescription, thumbnail } =
          response.data.data;

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay Key ID
          amount: paymentResponse.amount,
          currency: paymentResponse.currency,
          name: courseName,
          description: courseDescription,
          image: thumbnail,
          order_id: paymentResponse.id,
          handler: async (response) => {
            try {
              const result = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/payments/verify`,
                response,
                { withCredentials: true }
              );

              if (result.status === 200) {
                navigate("/success"); // Navigate to a success page
              } else {
                alert("Payment verification failed");
              }
            } catch (error) {
              console.error("Error verifying payment:", error);
              alert("Error verifying payment");
            }
          },
          prefill: {
            name: "User Name", // You can replace with actual user's name
            email: "user@example.com", // You can replace with actual user's email
          },
          notes: {
            courseId: id,
          },
          theme: {
            color: "#F37254",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error(
          "Error purchasing course:",
          error,
          error.response ? error.response.data.message : error.message
        );
      }
    };

    buyCourse();
  }, [id, navigate]);
};
export default Buycourse;
