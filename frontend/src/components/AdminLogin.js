import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const AdminLogin = ({ setIsAdmin, setJwtToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password,
      });

      if (response.data.success) {
        // Save the JWT token in localStorage
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);
        setJwtToken(token);
        setIsAdmin(true); // Set the admin status to true

        // Redirect to the admin panel page
        navigate("/admin"); // Navigate to /admin route after successful login
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form className="space-y-6 text-center" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full px-4 py-3 border border-red-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        className="w-full px-4 py-3 border border-red-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </form>
  );
};

export default AdminLogin;
