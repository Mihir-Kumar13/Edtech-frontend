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
          className="size-40 invert-color mb-4"
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
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4">Terms and Conditions</h2>
        <p className="text-lg mb-4">
          Welcome to LearnVerse. By accessing or using our services, you agree
          to be bound by these Terms and Conditions. Our services include access
          to a variety of educational content and resources. Users must adhere
          to all applicable laws and regulations when using our platform. We
          reserve the right to modify these terms at any time without prior
          notice. Continued use of the service constitutes acceptance of the new
          terms.
        </p>

        <h2 className="text-3xl font-bold mb-4">Privacy Policy</h2>
        <p className="text-lg mb-4">
          LearnVerse is committed to protecting your privacy. We collect
          personal information such as your name, email address, and payment
          details to provide and improve our services. This information is kept
          secure and is not shared with third parties without your consent,
          except as required by law. For more detailed information, please read
          our full Privacy Policy on our website.
        </p>

        <h2 className="text-3xl font-bold mb-4">Refunds/Cancellations</h2>
        <p className="text-lg mb-4">
          Our refund policy is designed to ensure customer satisfaction. If you
          are not satisfied with our services, you may request a refund within 1
          day of purchase. Refunds are processed within 5-7 working days and
          will be credited to your bank account. Cancellations can be made
          through your account dashboard or by contacting our support team.
        </p>

        <h2 className="text-3xl font-bold mb-4">Pricing</h2>
        <p className="text-lg mb-4">
          LearnVerse offers a variety of pricing plans to suit different needs.
          Our prices are competitive and reflect the quality of the educational
          content provided. Detailed pricing information for each course or
          service can be found on the respective product pages. We strive to
          ensure transparency in our pricing and offer periodic discounts and
          promotions.
        </p>

        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <h2 className="text-3xl font-bold mb-4">BUSSINESS NAME: SIDDHANT</h2>
        <p className="text-lg mb-4">For any inquiries, please contact us at:</p>
        <p className="text-lg mb-4">Phone: +91-8447388412</p>
        <p className="text-lg mb-4">Email: laernverse544@gmail.com</p>
        <p className="text-lg mb-4">
          Address: 76 jeewan park, New Delhi, India
        </p>

        <h2 className="text-3xl font-bold mb-4">Products/Services</h2>
        <p className="text-lg mb-4">
          LearnVerse provides a wide range of educational products and services
          designed to cater to learners of all ages and skill levels. Our
          offerings include interactive online courses, downloadable study
          materials, and live tutoring sessions. Each product and service is
          crafted to ensure an engaging and effective learning experience.
          Explore our course catalog to find the right educational resources for
          your needs.
        </p>
      </div>
    </div>
  );
};

export default Aboutus;
