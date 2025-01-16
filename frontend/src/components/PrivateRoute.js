// import React from "react";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ element }) => {
//   const token = localStorage.getItem("jwtToken");

//   return token ? element : <Navigate to="/admin/login" replace />;
// };

// export default PrivateRoute;
import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    // No token, redirect to login
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    if (decodedToken.exp < currentTime) {
      // Token expired, redirect to login
      localStorage.removeItem("jwtToken");
      return <Navigate to="/admin/login" replace />;
    }

    // Token is valid, render the element
    return element;
  } catch (error) {
    // If decoding fails, remove the token and redirect to login
    localStorage.removeItem("jwtToken");
    return <Navigate to="/admin/login" replace />;
  }
};

export default PrivateRoute;
