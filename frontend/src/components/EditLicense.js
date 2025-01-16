import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditLicense = () => {
  const { id } = useParams();
  const [licenseData, setLicenseData] = useState({
    dlno: "",
    name: "",
    dob: "",
    fatherName: "",
    address: "",
    licenseOffice: "",
    citizenshipNo: "",
    passportNo: "",
    contactNo: "",
    category: "",
    bloodGroup: "",
    issuedDate: "",
    expiryDate: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLicense = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setError("Access Denied: Please log in as an admin.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/licenses/license/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { data } = response.data;
        setLicenseData((prevData) => ({
          ...prevData,
          dlno: data.dlno || "",
          name: data.name || "",
          dob: data.dob ? data.dob.split("T")[0] : "",
          fatherName: data.fatherName || "",
          address: data.address || "",
          licenseOffice: data.licenseOffice || "",
          citizenshipNo: data.citizenshipNo || "",
          passportNo: data.passportNo || "",
          contactNo: data.contactNo || "",
          category: data.category || "",
          bloodGroup: data.bloodGroup || "",
          issuedDate: data.issuedDate ? data.issuedDate.split("T")[0] : "",
          expiryDate: data.expiryDate ? data.expiryDate.split("T")[0] : "",
        }));
      } catch (err) {
        setError("An error occurred while fetching the license.");
      }
    };
    fetchLicense();
  }, [id]);

  const handleChange = (e) => {
    setLicenseData({
      ...licenseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("Access Denied: Please log in as an admin.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/licenses/edit/${id}`,
        licenseData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("License updated successfully.");
    } catch (err) {
      setError("An error occurred while updating the license.");
    }
  };

  return (
    <div className="flex justify-center mt-8 lg:ml-8">
      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-6">Edit License</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.keys(licenseData).map((key) => (
            <div key={key} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <label
                htmlFor={key}
                className="block text-sm font-medium text-gray-700"
              >
                {key.replace(/([A-Z])/g, " $1").toUpperCase()}
              </label>
              <input
                type={key.toLowerCase().includes("date") ? "date" : "text"}
                name={key}
                id={key}
                value={licenseData[key]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").toUpperCase()}`}
                required
              />
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Update License
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLicense;
