import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="mx-auto py-24 w-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
