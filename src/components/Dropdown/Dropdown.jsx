import React from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css";
const Dropdown = () => {
  return (
    <div className="flex flex-col gap-4 dropdown-menu">
      <Link to="/profile">Profile</Link>
      <Link to="/wallet">Wallet</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
};

export default Dropdown;
