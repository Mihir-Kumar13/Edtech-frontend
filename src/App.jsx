import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { addUser, removeUser } from "./Store/authSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import useCourse from "./Hooks/useCourseCaegory";
import { Outlet } from "react-router";
import "./App.css";

const App = ({ addUser, removeUser }) => {
  const { loading, error } = useCourse();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/users/getcurrentuser`,
          {},
          {
            withCredentials: true,
          }
        );

        const user = response.data?.data;

        if (user) {
          addUser(user);
        } else {
          removeUser();
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        removeUser();
      } finally {
        setLoader(false);
      }
    };

    fetchCurrentUser();
  }, [addUser, removeUser]);

  if (loader) {
    return (
      <div className="bg-zinc-900 min-h-screen text-6xl text-red-500"> </div>
    ); // Show loader while fetching the user
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <Header />
      <main className="flex-grow mt-20 shadow-[0_4px_6px_-1px_rgba(255,255,255,0.5),_0_2px_4px_-2px_rgba(255,255,255,0.3)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const mapDispatchToProps = {
  addUser,
  removeUser,
};

export default connect(null, mapDispatchToProps)(App);
