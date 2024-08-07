import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import useCourse from "./Hooks/useCourseCaegory";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./Store/authSlice";
import logo from "./assets/4CxDWZ01.svg";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./animations.css"; // Create this file for your CSS animations

const App = () => {
  const { loading, error } = useCourse();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const location = useLocation();

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
          dispatch(addUser(user));
        } else {
          dispatch(removeUser());
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        dispatch(removeUser());
      } finally {
        setLoader(false);
      }
    };

    fetchCurrentUser();
  }, [dispatch]);

  if (loader) {
    return (
      <div className="flex justify-center items-center bg-gradient-to-b from-gray-900 to-black min-h-screen">
        <img
          src={logo}
          alt="Logo"
          className="invert-color w-40 fade-in bounce"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gradient-to-b from-gray-900 to-black min-h-screen  text-white">
      <Header />
      <main className="flex-grow mt-14 shadow-[0_4px_6px_-1px_rgba(255,255,255,0.5),_0_2px_4px_-2px_rgba(255,255,255,0.3)]">
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Outlet />
          </CSSTransition>
        </TransitionGroup>
      </main>
      <Footer />
    </div>
  );
};

export default App;
