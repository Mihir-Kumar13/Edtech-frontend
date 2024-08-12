import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";

const ReviewSection = () => {
  const reviews = useSelector((state) => state.course.reviews);

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
    <div className="mx-auto text-white mt-12 px-4 sm:px-6 lg:px-8 ">
      <span className="block text-center text-2xl sm:text-3xl font-bold mb-6">
        Reviews From Our Students
      </span>
      <div className="carousel-container">
        <Slider {...settings}>
          {reviews?.map((review) => (
            <div key={review._id} className="p-4">
              <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg text-center h-[300px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <img
                      src={review.user.image}
                      alt={`${review.user.firstName} ${review.user.lastName}`}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-bold">{`${review.user.firstName} ${review.user.lastName}`}</h3>
                    </div>
                  </div>
                  <p className="text-lg mb-2 line-clamp-3">{review.review}</p>
                </div>
                <div>
                  <div className="flex items-center justify-center">
                    <span className="text-yellow-400 text-2xl mr-2">★</span>
                    <span>{review.rating}/5</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Posted on: {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ReviewSection;
