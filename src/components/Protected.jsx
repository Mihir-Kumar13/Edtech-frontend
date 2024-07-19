import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // Check if user is authenticated
    if (authStatus) {
      // If user is authenticated and trying to access a non-authenticated route, redirect to home
      if (!authentication) {
        navigate("/");
      }
    } else {
      // If user is not authenticated and trying to access an authenticated route, redirect to login
      if (authentication) {
        navigate("/login");
      }
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
