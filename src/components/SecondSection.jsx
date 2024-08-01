import React from "react";
import logo from "../assets/whatweoffer.png";
import HomeCard from "./HomeCard";
import logo1 from "../assets/app-development.png";
import logo2 from "../assets/data.png";
import logo3 from "../assets/data2.png";

const offers = [
  {
    id: 1,
    image: logo1,
    title: "System Design Prep",
    description: "Wanna learn how to build a scalable System?",
    buttonText: "Read More",
    onButtonClick: () => alert("System Design Prep Read More clicked!"),
  },
  {
    id: 2,
    image: logo2,
    title: "Web Development Bootcamp",
    description:
      "Become a full stack web developer with our comprehensive course.",
    buttonText: "Start Now",
    onButtonClick: () => alert("Web Development Bootcamp Start Now clicked!"),
  },
  {
    id: 3,
    image: logo3,
    title: "Data Structures & Algorithms",
    description: "Master DSA with hands-on practice and expert guidance.",
    buttonText: "Learn More",
    onButtonClick: () =>
      alert("Data Structures & Algorithms Learn More clicked!"),
  },
];

const SecondSection = () => {
  return (
    <div className="mx-auto text-white mt-20 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <img src={logo} className="mx-auto w-32 h-auto" alt="what we offer" />
        <span className="block text-2xl sm:text-3xl font-bold mt-4">
          What We Offer
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0 justify-center">
        {offers.map((offer) => (
          <HomeCard
            key={offer.id}
            image={offer.image}
            title={offer.title}
            description={offer.description}
            buttonText={offer.buttonText}
            onButtonClick={offer.onButtonClick}
          />
        ))}
      </div>
    </div>
  );
};

export default SecondSection;
