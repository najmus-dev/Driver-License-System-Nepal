// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const AllLicenses = () => {
//   const [licenses, setLicenses] = useState([]);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchLicenses = async () => {
//       const token = localStorage.getItem("jwtToken"); // Retrieve JWT token from localStorage
//       if (!token) {
//         setError("Access Denied: Please log in as an admin.");
//         return;
//       }

//       try {
//         const response = await axios.get("http://localhost:5000/api/licenses/all", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setLicenses(response.data.data);
//       } catch (err) {
//         setError("An error occurred while fetching licenses.");
//       }
//     };
//     fetchLicenses();
//   }, []);

//   const handleDelete = async (id) => {
//     const token = localStorage.getItem("jwtToken");
//     if (!token) {
//       setError("Access Denied: Please log in as an admin.");
//       return;
//     }

//     if (window.confirm("Are you sure you want to delete this license?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/licenses/delete/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setLicenses(licenses.filter((license) => license._id !== id));
//         setMessage("License deleted successfully.");
//       } catch (err) {
//         setError("Failed to delete license.");
//       }
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-center">All Licenses</h2>
//       {error && <p className="text-red-500 text-center">{error}</p>}
//       {message && <p className="text-green-500 text-center">{message}</p>}

//       <table className="w-full mt-4 border border-gray-300">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 border">DL No</th>
//             <th className="px-4 py-2 border">Name</th>
//             <th className="px-4 py-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {licenses.map((license) => (
//             <tr key={license._id}>
//               <td className="px-4 py-2 border">{license.dlno}</td>
//               <td className="px-4 py-2 border">{license.name}</td>
//               <td className="px-4 py-2 border">
//                 <Link
//                   to={`/admin/edit-license/${license._id}`}
//                   className="text-blue-600 hover:text-blue-800 mr-4"
//                 >
//                   Edit
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(license._id)}
//                   className="text-red-600 hover:text-red-800"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllLicenses;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal"; // Import the modal component

const AllLicenses = () => {
  const [licenses, setLicenses] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [licenseToDelete, setLicenseToDelete] = useState(null); // Track which license to delete

  useEffect(() => {
    const fetchLicenses = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setError("Access Denied: Please log in as an admin.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/licenses/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLicenses(response.data.data);
      } catch (err) {
        setError("An error occurred while fetching licenses.");
      }
    };
    fetchLicenses();
  }, []);

  const handleDelete = (id) => {
    setLicenseToDelete(id); // Set the license ID to delete
    setIsModalOpen(true); // Open the modal
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("Access Denied: Please log in as an admin.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/licenses/delete/${licenseToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLicenses((prevLicenses) =>
        prevLicenses.filter((license) => license._id !== licenseToDelete)
      );
      setMessage("License deleted successfully.");
      setIsModalOpen(false); // Close the modal
    } catch (err) {
      setError("Failed to delete license.");
      setIsModalOpen(false); // Close the modal
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // Close the modal without deleting
    setLicenseToDelete(null); // Reset the license to delete
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">All Licenses</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {message && <p className="text-green-500 text-center">{message}</p>}

      <table className="w-full mt-4 border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border">DL No</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {licenses.map((license) => (
            <tr key={license._id}>
              <td className="px-4 py-2 border">{license.dlno}</td>
              <td className="px-4 py-2 border">{license.name}</td>
              <td className="px-4 py-2 border">
                <Link
                  to={`/admin/edit-license/${license._id}`}
                  className="text-blue-600 hover:text-blue-800 mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(license._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="Are you sure you want to delete this license?"
      />
    </div>
  );
};

export default AllLicenses;
