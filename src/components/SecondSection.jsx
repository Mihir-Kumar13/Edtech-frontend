import React from "react";
import logo from "../assets/whatweoffer.png";
import HomeCard from "./HomeCard";
import logo1 from "../assets/app-development.png";
import logo2 from "../assets/data.png";
import logo3 from "../assets/data2.png";
const offers = [
  {
    id: 1,
    image: logo1, // Replace with the actual image path or import
    title: "System Design Prep",
    description: "Wanna learn how to build a scalable System?",
    buttonText: "Read More",
    onButtonClick: () => alert("System Design Prep Read More clicked!"),
  },
  {
    id: 2,
    image: logo2, // Replace with the actual image path or import
    title: "Web Development Bootcamp",
    description:
      "Become a full stack web developer with our comprehensive course.",
    buttonText: "Start Now",
    onButtonClick: () => alert("Web Development Bootcamp Start Now clicked!"),
  },
  {
    id: 3,
    image: logo3, // Replace with the actual image path or import
    title: "Data Structures & Algorithms",
    description: "Master DSA with hands-on practice and expert guidance.",
    buttonText: "Learn More",
    onButtonClick: () =>
      alert("Data Structures & Algorithms Learn More clicked!"),
  },
];

const SecondSection = () => {
  return (
    <div className="mx-auto text-white mt-48">
      <div>
        <img src={logo} className="mx-auto size-24" alt="faqs" />
        <span className="block text-center text-3xl font-bold mt-4">
          What We Offer
        </span>
      </div>
      <div className="mt-10 flex justify-evenly mx-auto">
        {offers.map((offer) => {
          return (
            <HomeCard
              key={offer.id}
              image={offer.image}
              title={offer.title}
              description={offer.description}
              buttonText={offer.buttonText}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SecondSection;
