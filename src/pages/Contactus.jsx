import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-300"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-1 block p-2 w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

const ContactInfo = ({ icon, title, content }) => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0">
      <span className="flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
        {icon}
      </span>
    </div>
    <div>
      <p className="text-lg font-medium text-white">{title}</p>
      <p className="mt-1 text-gray-300">{content}</p>
    </div>
  </div>
);

const Contactus = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-300">
            We'd love to hear from you! Whether you have a question about our
            courses, pricing, or anything else, our team is ready to answer all
            your questions.
          </p>
        </div>
        <div className="mt-16 lg:mt-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-8">
              <ContactInfo
                icon={<FaEnvelope className="h-6 w-6" />}
                title="Email"
                content="learnverse544@gmail.com"
              />
              <ContactInfo
                icon={<FaPhone className="h-6 w-6" />}
                title="Phone"
                content="+91-8447388412"
              />
              <ContactInfo
                icon={<FaMapMarkerAlt className="h-6 w-6" />}
                title="Address"
                content=" New Delhi, India"
              />
            </div>
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
