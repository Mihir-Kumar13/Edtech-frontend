import React from "react";
import HeroSection from "../components/HeroSection";
import ReviewSection from "../components/ReviewSection";
import SecondSection from "../components/SecondSection";
import Faqs from "../components/Faqs";

const Home = () => {
  return (
    <div className="w-[80%] mx-auto py-4 my-20">
      <HeroSection />
      <SecondSection />
      <ReviewSection />
      <Faqs />
    </div>
  );
};

export default Home;
