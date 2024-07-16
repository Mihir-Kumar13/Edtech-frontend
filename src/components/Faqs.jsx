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

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mt-24">
      <div>
        <img src={logo} className="mx-auto size-28" alt="faqs" />
        <span className="block text-center text-3xl font-bold mt-4">
          Frequently Asked Questions
        </span>
      </div>
      <div className="w-full mt-12 text-lg">
        {accordionData.map((item, index) => (
          <div key={item.id} className="border-b border-gray-200">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left px-4 py-2 focus:outline-none focus:bg-zinc-600"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    activeIndex === index ? "transform rotate-180" : ""
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
              ref={(el) => (contentRefs.current[index] = el)}
              className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                activeIndex === index ? "max-h-screen" : "max-h-0"
              }`}
              style={{
                maxHeight:
                  activeIndex === index
                    ? `${contentRefs.current[index]?.scrollHeight}px`
                    : "0px",
              }}
            >
              <div className="px-4 py-2 bg-zinc-600">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
