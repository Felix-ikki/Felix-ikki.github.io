import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

const RequireAuth = ({ children }) => {
  const auth = useAuth();

  if (!auth.loggedIn) {
    return <Navigate to="/LogIn" />;
  }

  return children;
};

export default RequireAuth;
