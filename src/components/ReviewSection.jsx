import React from "react";
import Slider from "react-slick";

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
    slidesToShow: 1, // Default to 1 slide on small screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 450, // Mobile screens (sm)
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 640, // Tablet and small desktops (md)
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 3000, // Large screens (lg)
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="mx-auto text-white mt-12 px-4 sm:px-6 lg:px-8">
      <span className="block text-center text-2xl sm:text-3xl font-bold mb-6">
        Reviews From Our Students
      </span>
      <div className="carousel-container">
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review.id} className="p-4">
              <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg text-center min-h-[200px]">
                <h3 className="text-xl font-bold mb-2">{review.title}</h3>
                <p>{review.content}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ReviewSection;
