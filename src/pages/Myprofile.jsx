import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faBirthdayCake,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";

const Myprofile = () => {
  const user = useSelector((state) => state.auth.user);

  const profileFields = [
    { icon: faEnvelope, label: "Email", value: user.email },
    { icon: faPhone, label: "Mobile Number", value: user.mobile },
    { icon: faBirthdayCake, label: "Date of Birth", value: user.dateofBirth },
    { icon: faVenusMars, label: "Gender", value: user.gender },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-zinc-800 rounded-lg shadow-lg text-white">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="flex flex-col md:flex-row items-center mb-8">
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />
        <div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left">
          <h2 className="text-2xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-400">{user.accountType}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profileFields.map((field, index) => (
          <div key={index} className="bg-zinc-700 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <FontAwesomeIcon
                icon={field.icon}
                className="text-blue-400 mr-2"
              />
              <span className="text-gray-400">{field.label}</span>
            </div>
            <p className="text-lg">{field.value || "Not provided"}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
        <p className="text-gray-400">
          This section can include any additional details or achievements you'd
          like to highlight.
        </p>
      </div>
    </div>
  );
};

export default Myprofile;
