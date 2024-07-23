import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authStatus !== undefined) {
      if (authStatus) {
        if (!authentication) {
          navigate("/");
        }
      } else {
        if (authentication) {
          navigate("/login");
        }
      }
      setLoader(false);
    }
  }, [authStatus, navigate, authentication]);

  if (loader) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
}
