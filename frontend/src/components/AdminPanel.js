import React from "react";
import { FaPlus, FaList, FaSignOutAlt } from "react-icons/fa"; // Use the fa package
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminPanel = ({ setIsAdmin, setJwtToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Remove the JWT token from localStorage
      localStorage.removeItem("jwtToken");
      setJwtToken(null);
      setIsAdmin(false);

      // Redirect to login page after logout
      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#F56565] via-[#FC8181] to-[#FEE2E2] text-white shadow-lg">
        <div className="p-4 text-center font-bold text-2xl">Admin Panel</div>
        <nav className="space-y-2 px-4">
          <NavItem to="add-license" icon={<FaPlus />} label="Add License" />
          <NavItem to="all-licenses" icon={<FaList />} label="All Licenses" />
          <NavItem
            to="#"
            icon={<FaSignOutAlt />}
            label="Logout"
            onClick={handleLogout} // Trigger logout on click
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick} // Handle onClick for logout
    className="flex items-center p-2 text-lg font-medium rounded-lg hover:bg-gradient-to-r from-[#FC8181] to-[#F56565] hover:text-white"
  >
    <div className="text-xl mr-3">{icon}</div>
    {label}
  </Link>
);

export default AdminPanel;
