import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOreder from "./pages/PlaceOrder/PlaceOreder";
import Footer from "./components/Footer/Footer";
import toastr from "toastr";
import LoginPopUp from "./components/LoginPopup/LoginPopUp";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./Context/AuthContext";
import Profile from "./pages/Profile/Profile";

toastr.options = {
  positionClass: "toast-top-right",
  preventDuplicates: true,
  closeButton: true,
  timeOut: 5000,
};
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <AuthProvider>
        {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
        <div className="app">
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOreder />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </>
  );
};

export default App;
