import React, { useRef, useState } from "react";
import logo from "../assets/faqs.png";
const accordionData = [
  {
    id: "item-1",
    question: "What courses are offered?",
    answer:
      "We offer a wide range of courses in various fields including programming, data science, design, marketing, and more.",
  },
  {
    id: "item-2",
    question: "How do I enroll in a course?",
    answer:
      "You can enroll in a course by creating an account on our website, browsing the available courses, and clicking on the 'Enroll' button.",
  },
  {
    id: "item-3",
    question: "What is the refund policy?",
    answer:
      "We offer a 30-day money-back guarantee on all our courses. If you are not satisfied with a course, you can request a refund within 30 days of purchase.",
  },
  {
    id: "item-4",
    question: "Are there any prerequisites for the courses?",
    answer:
      "Most of our courses are designed for beginners, but some advanced courses may have prerequisites. Please check the course details for specific requirements.",
  },
  {
    id: "item-5",
    question: "Can I get a certificate after completing a course?",
    answer:
      "Yes, you will receive a certificate of completion after successfully finishing a course. You can download and share your certificate from your profile.",
  },
  {
    id: "item-6",
    question: "Are the courses self-paced?",
    answer:
      "Yes, our courses are self-paced, allowing you to learn at your own convenience and schedule.",
  },
  {
    id: "item-7",
    question: "What kind of support is available for learners?",
    answer:
      "We offer 24/7 support through our help center. You can also reach out to instructors and fellow learners through course forums and discussion boards.",
  },
  {
    id: "item-8",
    question: "Can I access the course materials offline?",
    answer:
      "Yes, you can download course materials and access them offline through our mobile app.",
  },
  {
    id: "item-9",
    question: "How can I track my progress?",
    answer:
      "You can track your progress through your dashboard, which shows your completed lessons, quizzes, and overall course progress.",
  },
  {
    id: "item-10",
    question: "Is financial aid available?",
    answer:
      "Yes, we offer financial aid and scholarships to eligible learners. You can apply for financial aid through the course enrollment page.",
  },
];

const AccordionItem = ({ item, isActive, onClick }) => (
  <div className="mb-4 bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
    <button
      onClick={onClick}
      className="w-full text-left px-6 py-4 focus:outline-none focus:bg-gray-700 transition-colors duration-200"
    >
      <div className="flex justify-between items-center">
        <span className="font-medium text-lg text-white">{item.question}</span>
        <svg
          className={`w-6 h-6 transition-transform duration-200 ${
            isActive ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="px-6 py-4 bg-gray-700 text-gray-300">{item.answer}</div>
    </div>
  </div>
);

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen  text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <img src={logo} className="mx-auto w-24 h-24 mb-6" alt="FAQs" />
          <h1 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-400">
            Find answers to common questions about our platform and courses.
          </p>
        </div>
        <div className="space-y-6">
          {accordionData.map((item, index) => (
            <AccordionItem
              key={item.id}
              item={item}
              isActive={activeIndex === index}
              onClick={() => toggleAccordion(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
