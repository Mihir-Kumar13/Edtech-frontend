import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeUser } from "../Store/authSlice";
import { useNavigate } from "react-router";

const Settings = () => {
  const user = useSelector((state) => state.auth.user);
  const [userData, setUserData] = useState({ ...user });
  const dispatch = useDispatch();
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/update-profile`,
        userData,
        {
          withCredentials: true,
        }
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
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/update-password`,
        {
          ...passwordData,
          email: userData.email,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);

      toast.success("Password Updated Successfully");
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error updating password";
      toast.error(errorMessage);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/delete-profile`,
        {},
        {
          withCredentials: true,
        }
      );

      // console.log(response);
      if (response.status == 200) {
        toast.success("Profile Deleted Successfully");
        navigate("/");

        dispatch(removeUser());
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error deleting profile";
      toast.error(errorMessage);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imageUpload", selectedFile);

    // Replace '/upload' with your actual upload URL
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-full  ">
      <h1 className="text-3xl mt-4"> Profile Pic:</h1>
      <div className=" grid grid-cols-2 items-center text-2xl ">
        <img src={userData.image} className="size-32" />
        <div className="w-10/12">
          <label htmlFor="imageUpload">Upload Image:</label>

          <input
            type="file"
            className="bg-zinc-700 w-full px-2 rounded-md "
            id="imageUpload"
            name="imageUpload"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className=" flex flex-row-reverse">
        <button
          className="  w-1/6 mr-4 text-lg bg-blue-500 rounded-md hover:bg-blue-700 text-white font-bold my-4 py-2 px-4 space-x-2"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>

      <hr />
      <h1 className="text-3xl mt-4"> Profile:</h1>

      <div className="grid grid-cols-2 text-2xl my-4">
        <div className="w-10/12">
          <label>
            First Name:
            <input
              className="bg-zinc-700 w-full px-2 rounded-md "
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="w-10/12">
          <label className="">
            Last Name:
            <input
              className="bg-zinc-700 w-full px-2 rounded-md"
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="w-10/12">
          <label>
            Email:
            <input
              className="bg-zinc-700 w-full px-2 rounded-md"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="w-10/12">
          <label>
            Mobile Number:
            <input
              className="bg-zinc-700 w-full px-2 rounded-md"
              type="text"
              name="mobile"
              value={userData.mobile}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="w-10/12">
          <label>
            Date of Birth:
            <input
              className="bg-zinc-700 w-full px-2 rounded-md"
              type="date"
              name="dateofBirth"
              value={userData?.dateofBirth}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="w-10/12">
          <label>
            Gender:
            <input
              className="bg-zinc-700 w-full px-2 rounded-md"
              type="text"
              name="gender"
              value={userData?.gender}
              onChange={handleInputChange}
            />
          </label>
        </div>
      </div>

      <div className=" flex flex-row-reverse">
        <button
          className="  w-1/6 mr-4 text-lg bg-blue-500 rounded-md hover:bg-blue-700 text-white font-bold my-4 py-2 px-4 space-x-2"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <hr />
      <div>
        <h2 className="text-3xl mt-4 ">Change Password:</h2>
        <div className="grid grid-cols-2 text-2xl">
          <div className="w-10/12">
            <label>
              Old Password:
              <input
                className="bg-zinc-700 w-full px-2 rounded-md"
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
              />
            </label>
          </div>
          <div className="w-10/12">
            <label>
              New Password:
              <input
                className="bg-zinc-700 w-full px-2 rounded-md"
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </label>
          </div>
        </div>

        <div className=" flex flex-row-reverse">
          <button
            className="w-1/6 mr-4 text-lg  bg-blue-500 rounded-md hover:bg-blue-700 text-white font-bold my-4 py-2 px-4 space-x-2"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </div>
      </div>

      <hr />
      <div className=" flex flex-row-reverse items-center">
        <button
          className="w-1/6 mr-4 text-lg bg-red-700 rounded-md hover:bg-red-500
        text-white font-bold my-4 py-2 px-4 space-x-2"
          onClick={handleDeleteProfile}
        >
          Delete Profile
        </button>
        <p className="text-red-500 mr-40 text-2xl">
          {" "}
          Once You deleted profile. Your data can't be retrieved again
        </p>
      </div>
    </div>
  );
};

export default Settings;
