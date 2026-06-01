import React, { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { DataContex } from "../dataprovider/DataProvider";

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();

  const [{ user }] = useContext(DataContex);

  useEffect(() => {
    if (!user) {
      navigate("/auth", {
        state: {
          msg: msg,
          redirect: redirect,
        },
      });
    }
  }, [user, navigate, msg, redirect]);

  return user ? children : null;
};

export default ProtectedRoute;
