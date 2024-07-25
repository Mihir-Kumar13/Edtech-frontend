import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Aboutus from "./pages/Aboutus.jsx";
import Contactus from "./pages/Contactus.jsx";
import Courses from "./pages/Courses.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import Protected from "./components/Protected.jsx";
import Coursepage from "./pages/Coursepage.jsx";
import Buycourse from "./pages/Buycourse.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Myprofile from "./pages/Myprofile.jsx";
import Settings from "./pages/Settings.jsx";
import Enrolledcourses from "./pages/Enrolledcourses.jsx";
import Mycourses from "./pages/Mycourses.jsx";
import Addcourse from "./pages/Addcourse.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "buy-course/:id",
        element: (
          <Protected authentication={true}>
            <Buycourse />
          </Protected>
        ),
      },
      {
        path: "about",
        element: <Aboutus />,
      },
      {
        path: "dashboard",
        element: (
          <Protected authentication={true}>
            <Dashboard />
          </Protected>
        ),
        children: [
          { path: "myprofile", element: <Myprofile /> },
          {
            path: "setting",
            element: <Settings />,
          },
          { path: "mycourses", element: <Mycourses /> },
          {
            path: "enrolledcourses",
            element: <Enrolledcourses />,
          },
          { path: "addcourse", element: <Addcourse /> },
        ],
      },

      {
        path: "contact",
        element: <Contactus />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "courses/:id", // Add dynamic route for course details
        element: <Coursepage />,
      },
      {
        path: "login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
