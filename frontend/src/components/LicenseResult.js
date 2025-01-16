import React from "react";

const LicenseResult = ({ licenseData }) => {
  if (!licenseData) return null; // If no data, don't render anything.

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg space-y-6 mt-6 max-w-3xl mx-auto border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-4">
        License Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner border">
          <p className="text-gray-700">
            <strong className="text-gray-900">DL No:</strong>{" "}
            {licenseData.dlno}
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">Name:</strong> {licenseData.name}
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">Date of Birth:</strong>{" "}
            {licenseData.dob}
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">Father's Name:</strong>{" "}
            {licenseData.fatherName}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner border">
          <p className="text-gray-700">
            <strong className="text-gray-900">Address:</strong>{" "}
            {licenseData.address}
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">City Office:</strong>{" "}
            {licenseData.licenseOffice}
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">Citizenship No:</strong>{" "}
            {licenseData.citizenshipNo}
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">Passport No:</strong>{" "}
            {licenseData.passportNo}
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">Contact No:</strong>{" "}
            {licenseData.contactNo}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner border">
          <p className="text-gray-700">
            <strong className="text-gray-900">Category:</strong>{" "}
            {licenseData.category}
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">Blood Group:</strong>{" "}
            {licenseData.bloodGroup}
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">Issued Date:</strong>{" "}
            {licenseData.issuedDate}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner border">
          <p className="text-gray-700">
            <strong className="text-gray-900">Expiry Date:</strong>{" "}
            {licenseData.expiryDate}
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-900">Status:</strong>{" "}
            <span
              className={`px-3 py-1 rounded-full text-white text-sm ${
                licenseData.status === "Active"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {licenseData.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LicenseResult;
