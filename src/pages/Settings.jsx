import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeUser, addUser } from "../Store/authSlice";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faUpload,
  faTrash,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

const Settings = () => {
  const user = useSelector((state) => state.auth.user);
  const [userData, setUserData] = useState({ ...user });
  userData.courses = undefined;
  const dispatch = useDispatch();
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/update-profile`,
        userData,
        { withCredentials: true }
      );
      if (response.data.data.status === 200) {
        dispatch(addUser(response.data.data));
      }
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  const handleChangePassword = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/update-password`,
        { ...passwordData, email: userData.email },
        { withCredentials: true }
      );
      toast.success("Password Updated Successfully");
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating password");
    }
  };

  const handleDeleteProfile = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your profile? This action cannot be undone."
      )
    ) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/users/delete-profile`,
          {},
          { withCredentials: true }
        );
        if (response.status === 200) {
          toast.success("Profile Deleted Successfully");
          navigate("/");
          dispatch(removeUser());
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error deleting profile");
      }
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imageUpload", selectedFile);

    try {
      const response = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Image uploaded successfully");
      // Update user data with new image URL if provided by the server
      if (response.data.imageUrl) {
        setUserData({ ...userData, image: response.data.imageUrl });
      }
    } catch (error) {
      toast.error("Error uploading image");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-zinc-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-white">Profile Settings</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Profile Picture
        </h2>
        <div className="flex items-center space-x-6">
          <img
            src={userData.image}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex-1">
            <input
              type="file"
              id="imageUpload"
              name="imageUpload"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="imageUpload"
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <FontAwesomeIcon icon={faUpload} className="mr-2" />
              Choose File
            </label>
            {selectedFile && (
              <button
                onClick={handleSubmit}
                className="ml-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                Upload
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Email", name: "email", type: "email" },
            { label: "Mobile Number", name: "mobile" },
            { label: "Date of Birth", name: "dateofBirth", type: "date" },
            { label: "Gender", name: "gender" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={userData[field.name] || ""}
                onChange={handleInputChange}
                className="w-full bg-zinc-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          Save Changes
        </button>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Change Password
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              className="w-full bg-zinc-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full bg-zinc-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={handleChangePassword}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FontAwesomeIcon icon={faKey} className="mr-2" />
          Change Password
        </button>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Delete Profile
        </h2>
        <p className="text-red-400 mb-4">
          Warning: Once you delete your profile, your data cannot be retrieved.
        </p>
        <button
          onClick={handleDeleteProfile}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
          Delete Profile
        </button>
      </section>
    </div>
  );
};

export default Settings;
