import React, { useState } from "react";
import { useSelector } from "react-redux";

const Myprofile = () => {
  const user = useSelector((state) => state.auth.user);
  const [userData, setUserData] = useState({ ...user });
  return (
    <div>
      <h1 className="text-3xl mt-4"> Profile Pic:</h1>

      <div className=" grid grid-cols-2 items-center text-2xl ">
        <img src={userData.image} className="size-32" />
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
            />
          </label>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Myprofile;
