import React from "react";
import HomeCard from "./HomeCard";
import Slider from "react-slick";
import logo1 from "../assets/app-development.png";
import logo2 from "../assets/data.png";
import logo3 from "../assets/data2.png";

const ReviewSection = () => {
  const reviews = [
    {
      id: 1,
      title: "Great Product",
      content: "This product really helped me a lot!",
    },
    {
      id: 2,
      title: "Excellent Service",
      content: "The customer service was outstanding!",
    },
    {
      id: 3,
      title: "Highly Recommend",
      content: "I would highly recommend this to my friends.",
    },
    {
      id: 4,
      title: "Satisfied Customer",
      content: "Very satisfied with the purchase.",
    },
    { id: 5, title: "Value for Money", content: "Definitely worth the money." },
    {
      id: 6,
      title: "Fantastic",
      content: "Fantastic quality and fast shipping!",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  return (
    <div className="mx-auto text-white mt-48">
      <span className="block text-center text-3xl font-bold mt-4">
        Reviews From Our Students
      </span>
      <div className="carousel-container mt-10">
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review.id} className="p-4 ">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center min-h-56">
                <h3 className=" text-xl font-bold mb-2">{review.title}</h3>
                <p className="text-gray-700">{review.content}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ReviewSection;
