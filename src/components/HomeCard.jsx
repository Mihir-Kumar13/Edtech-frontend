// Card.jsx
import React from "react";

const HomeCard = ({ image, title, description, buttonText, onButtonClick }) => {
  return (
    <div className="relative max-w-xs mx-auto  bg-gradient-to-b hover:from-white to-zinc-900 text-white rounded-lg shadow-md overflow-hidden min-h-[450px] flex flex-col p-1">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent rounded-lg p-1"></div>
      <div className="relative bg-gradient-to-b from-zinc-900 to-zinc-900 text-white rounded-lg p-6 text-center flex-grow flex flex-col justify-between">
        <div className="flex justify-center mt-4">
          <img src={image} alt="Icon" className="w-24 h-24" />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-300 mb-4">{description}</p>
        </div>
        <div className="mt-4">
          <button
            onClick={onButtonClick}
            className="bg-yellow-500 text-black font-bold py-2 px-4 rounded-full shadow hover:bg-yellow-600 transition duration-300"
          >
            {buttonText} &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
export default HomeCard;
