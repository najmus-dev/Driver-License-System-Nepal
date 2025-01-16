import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LicenseForm from "./components/LicenseForm";
import LicenseResult from "./components/LicenseResult";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";
import PrivateRoute from "./components/PrivateRoute"; // Import the updated PrivateRoute
import AddLicense from "./components/AddLicense";
import All from "./components/AllLicenses";
import EditPage from "./components/EditLicense";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode

function App() {
  const [licenseData, setLicenseData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is logged in as admin
  const [jwtToken, setJwtToken] = useState(null); // Store JWT Token

  // Token expiration check on mount
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Get current time in seconds
        
        // Check if token is expired
        if (decodedToken.exp < currentTime) {
          // If token expired, clear localStorage and update state
          localStorage.removeItem("jwtToken");
          setJwtToken(null);
          setIsAdmin(false);
          alert("Your session has expired. Please log in again.");
        } else {
          setJwtToken(token);
          setIsAdmin(true); // Token is still valid, set admin state
        }
      } catch (error) {
        // If there's an error decoding the token, remove it and update state
        localStorage.removeItem("jwtToken");
        setJwtToken(null);
        setIsAdmin(false);
      }
    }
  }, []); // Empty dependency array to run only on mount

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <header className="relative text-white p-8 w-full text-center flex flex-col items-center rounded-lg">
          {/* Left Flag */}
          <img
            src="/flag.jpeg"
            alt="Nepal Flag"
            className="absolute top-4 left-28 w-10 h-auto"
          />

          {/* Logo and Text */}
          <img
            src="/logo.png"
            alt="Nepal Government Logo"
            className="w-24 h-auto mb-4"
          />
          <h1 className="text-3xl text-black font-bold">Government of Nepal</h1>
          <h2 className="text-xl text-blue-500 font-bold">
            Ministry of Physical Infrastructure and Transport
          </h2>
          <h3 className="text-lg text-black font-bold">
            Department of Transport Management
          </h3>
          <h3 className="text-lg text-red-500 font-bold">
            Online Driver License System
          </h3>

          {/* Right Flag */}
          <img
            src="/flag.jpeg"
            alt="Nepal Flag"
            className="absolute top-4 right-28 w-10 h-auto"
          />
        </header>

        <div className="bg-white w-full max-w-5xl mt-8 p-8 shadow-lg rounded-lg">
          <Routes>
            {/* Public Route for License Verification */}
            <Route
              path="/"
              element={<LicenseForm setLicenseData={setLicenseData} />}
            />
            <Route
              path="/result"
              element={<LicenseResult licenseData={licenseData} />}
            />

            {/* Admin Routes */}
            <Route
              path="/admin/login"
              element={
                <AdminLogin setIsAdmin={setIsAdmin} setJwtToken={setJwtToken} />
              }
            />

            {/* Admin Panel Protected by PrivateRoute */}
            <Route
              path="/admin"
              element={
                <PrivateRoute
                  element={
                    <AdminPanel
                      setIsAdmin={setIsAdmin}
                      setJwtToken={setJwtToken}
                    />
                  }
                />
              }
            >
              <Route index element={<All />} />
              <Route path="add-license" element={<AddLicense />} />
              <Route path="all-licenses" element={<All />} />
              <Route path="edit-license/:id" element={<EditPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
