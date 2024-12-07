// ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check if the user is authenticated
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  // If authenticated, render the child routes. If not, navigate to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
