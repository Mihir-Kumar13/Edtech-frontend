import React from "react";
import learnverseLogo from "../assets/4CxDWZ01.svg";

const InfoCard = ({ title, description }) => (
  <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 mb-6 lg:mb-0">
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-3 text-white">{title}</h2>
      <p className="text-gray-300">{description}</p>
    </div>
  </div>
);

const Section = ({ title, children }) => (
  <section className="mb-12">
    <h2 className="text-3xl font-bold mb-4 text-white">{title}</h2>
    {children}
  </section>
);

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
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <img
            src={learnverseLogo}
            alt="LearnVerse Logo"
            className="w-40 h-40 mx-auto mb-6 invert"
          />
          <h1 className="text-5xl font-bold mb-6">About LearnVerse</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Welcome to LearnVerse, your ultimate destination for comprehensive
            and engaging educational content. We are an innovative EdTech
            platform dedicated to empowering learners of all ages to achieve
            their academic goals and beyond.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {infoCards.map((card, index) => (
            <InfoCard key={index} {...card} />
          ))}
        </div>

        <div className="space-y-8 text-lg">
          <p>
            At LearnVerse, we believe in the power of technology to transform
            education. Our platform offers a wide range of courses across
            various subjects, all designed to provide an interactive and
            enriching learning experience.
          </p>
          <p>
            Our mission is to make quality education accessible to everyone,
            everywhere. With a team of expert educators and cutting-edge
            technology, we strive to create a learning environment that is both
            effective and enjoyable.
          </p>
          <p>
            Join us on a journey of knowledge and discovery. At LearnVerse, we
            don't just teach; we inspire and guide you towards a brighter
            future.
          </p>
        </div>

        <Section title="Terms and Conditions">
          <p>
            By accessing or using our services, you agree to be bound by these
            Terms and Conditions. Our services include access to a variety of
            educational content and resources. Users must adhere to all
            applicable laws and regulations when using our platform.
          </p>
        </Section>

        <Section title="Privacy Policy">
          <p>
            LearnVerse is committed to protecting your privacy. We collect
            personal information such as your name, email address, and payment
            details to provide and improve our services. This information is
            kept secure and is not shared with third parties without your
            consent, except as required by law.
          </p>
        </Section>

        <Section title="Refunds/Cancellations">
          <p>
            If you are not satisfied with our services, you may request a refund
            within 1 day of purchase. Refunds are processed within 5-7 working
            days and will be credited to your bank account. Cancellations can be
            made through your account dashboard or by contacting our support
            team.
          </p>
        </Section>

        <Section title="Pricing">
          <p>
            LearnVerse offers a variety of pricing plans to suit different
            needs. Our prices are competitive and reflect the quality of the
            educational content provided. Detailed pricing information for each
            course or service can be found on the respective product pages.
          </p>
        </Section>

        <Section title="Contact Us">
          <h3 className="text-2xl font-bold mb-4">BUSINESS NAME: SIDDHANT</h3>
          <p>For any inquiries, please contact us at:</p>
          <ul className="list-none mt-2">
            <li>Phone: +91-8447388412</li>
            <li>Email: learnverse544@gmail.com</li>
            <li>Address: New Delhi, India</li>
          </ul>
        </Section>

        <Section title="Products/Services">
          <p>
            LearnVerse provides a wide range of educational products and
            services designed to cater to learners of all ages and skill levels.
            Our offerings include interactive online courses, downloadable study
            materials, and live tutoring sessions.
          </p>
        </Section>
      </div>
    </div>
  );
};

export default Aboutus;
