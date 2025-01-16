import React, { useState } from "react";
import axios from "axios";
import LicenseResult from "./LicenseResult"; // Import LicenseResult component

const LicenseForm = () => {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [licenseData, setLicenseData] = useState(null); // Add state to hold license data

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error on new submit

    try {
      const response = await axios.post("http://localhost:5000/api/licenses/verify", {
        dlno: licenseNumber,
      });

      // Handle success or no data found
      if (response.data.success && response.data.data) {
        setLicenseData(response.data.data); // Set the retrieved license data
      } else {
        setError(response.data.message || "No data found for this license number.");
        setLicenseData(null); // Clear any previous data
      }
    } catch (err) {
      if (err.response) {
        // Check if the error response status is 404 and handle it as 'No Data Found'
        if (err.response.status === 404) {
          setError("No Data Found");
        } else {
          setError("An error occurred. Please try again.");
        }
      } else {
        setError("An error occurred. Please try again.");
      }
      setLicenseData(null); // Clear any previous data
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-white p-6 rounded-lg w-full sm:w-auto flex flex-col min-h-[300px]">
        {/* License Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-black mb-6">License Verification</h2>

          <input
            type="text"
            className="w-full px-4 py-3 border border-red-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
            placeholder="Enter DL No"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify License"}
          </button>

          {/* Error message stays below the form */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>

        
      </div>

      {/* License Result (show below the form) */}
      <div className="mt-6 min-h-[400px] shadow-lg">
          {licenseData ? (
            <LicenseResult licenseData={licenseData} />
          ) : (
            !loading && !error && (
              <p className="text-center text-pink-500 text-xl">No Data Found</p>
            )
          )}
        </div>
    </div>
  );
};

export default LicenseForm;
