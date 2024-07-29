import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import Protected from "./components/Protected.jsx";

// Lazy load the components
const Home = lazy(() => import("./pages/Home.jsx"));
const Aboutus = lazy(() => import("./pages/Aboutus.jsx"));
const Contactus = lazy(() => import("./pages/Contactus.jsx"));
const Courses = lazy(() => import("./pages/Courses.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Coursepage = lazy(() => import("./pages/Coursepage.jsx"));
const Buycourse = lazy(() => import("./pages/Buycourse.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Myprofile = lazy(() => import("./pages/Myprofile.jsx"));
const Settings = lazy(() => import("./pages/Settings.jsx"));
const Enrolledcourses = lazy(() => import("./pages/Enrolledcourses.jsx"));
const Mycourses = lazy(() => import("./pages/Mycourses.jsx"));
const Addcourse = lazy(() => import("./pages/Addcourse.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "buy-course/:id",
        element: (
          <Protected authentication={true}>
            <Suspense fallback={<div>Loading...</div>}>
              <Buycourse />
            </Suspense>
          </Protected>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Aboutus />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Protected authentication={true}>
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          </Protected>
        ),
        children: [
          {
            path: "myprofile",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Myprofile />
              </Suspense>
            ),
          },
          {
            path: "setting",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Settings />
              </Suspense>
            ),
          },
          {
            path: "mycourses",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Mycourses />
              </Suspense>
            ),
          },
          {
            path: "enrolledcourses",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Enrolledcourses />
              </Suspense>
            ),
          },
          {
            path: "addcourse",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Addcourse />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Contactus />
          </Suspense>
        ),
      },
      {
        path: "courses",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Courses />
          </Suspense>
        ),
      },
      {
        path: "courses/:id", // Add dynamic route for course details
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Coursepage />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Protected authentication={false}>
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          </Protected>
        ),
      },
      {
        path: "signup",
        element: (
          <Protected authentication={false}>
            <Suspense fallback={<div>Loading...</div>}>
              <Signup />
            </Suspense>
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
