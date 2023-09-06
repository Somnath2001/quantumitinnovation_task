import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./helper";

const PrivateRoute = ({ children }) => {
  const auth = isAuthenticated();
  return auth ? children : <Navigate to="/" />;
};

export default PrivateRoute;
