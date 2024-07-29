import React from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css";
import { useAuth } from "../../Context/AuthContext";

const Dropdown = ({ setShowDropdown }) => {
  const { logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-4 dropdown-menu">
      <Link to="/profile" onClick={toggleDropdown}>
        Profile
      </Link>
      <Link to="/wallet" onClick={toggleDropdown}>
        Wallet
      </Link>
      <Link to="/orders" onClick={toggleDropdown}>
        Orders
      </Link>
      <Link to="/logout" onClick={handleLogout}>
        Logout
      </Link>
    </div>
  );
};

export default Dropdown;
