import React from "react";
import learnverseLogo from "../assets/4CxDWZ01.svg"; // Adjust the path to your logo image

const Aboutus = () => {
  const infoCards = [
    {
      title: "Our Vision",
      description:
        "To be a global leader in education technology, transforming lives through innovative learning solutions.",
    },
    {
      title: "Our Mission",
      description:
        "To provide accessible, high-quality education for all, empowering learners to reach their full potential.",
    },
    {
      title: "Our Values",
      description:
        "Innovation, Excellence, Accessibility, Integrity, and Lifelong Learning.",
    },
  ];

  return (
    <div className="text-white w-[80%] mx-auto py-4 my-20">
      <div className="flex flex-col items-center">
        <img
          src={learnverseLogo}
          alt="LearnVerse Logo"
          className="size-40 invert-color  mb-4"
        />
        <h1 className="text-4xl font-bold mb-6 text-center">
          About LearnVerse
        </h1>
        <p className="text-xl mb-4 text-center">
          Welcome to LearnVerse, your ultimate destination for comprehensive and
          engaging educational content. We are an innovative EdTech platform
          dedicated to empowering learners of all ages to achieve their academic
          goals and beyond.
        </p>
        <p className="text-lg mb-4">
          At LearnVerse, we believe in the power of technology to transform
          education. Our platform offers a wide range of courses across various
          subjects, all designed to provide an interactive and enriching
          learning experience. Whether you're a student looking to ace your
          exams, a professional aiming to upskill, or simply someone with a
          passion for learning, LearnVerse has something for you.
        </p>
        <p className="text-lg mb-4">
          Our mission is to make quality education accessible to everyone,
          everywhere. With a team of expert educators and cutting-edge
          technology, we strive to create a learning environment that is both
          effective and enjoyable.
        </p>
        <p className="text-lg mb-4">
          Join us on a journey of knowledge and discovery. At LearnVerse, we
          don't just teach; we inspire and guide you towards a brighter future.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-around mt-10">
        {infoCards.map((card, index) => (
          <div
            key={index}
            className="relative max-w-xs mx-auto bg-gradient-to-b from-zinc-900 to-zinc-900 text-white rounded-lg shadow-md overflow-hidden min-h-[250px] flex flex-col p-1 mb-4 sm:mb-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent rounded-lg p-1"></div>
            <div className="relative bg-gradient-to-b from-zinc-900 to-zinc-900 text-white rounded-lg p-6 text-center flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
                <p className="text-gray-300 mb-4">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aboutus;
