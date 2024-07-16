import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopUp = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url =
      currState === "Sign up"
        ? "http://localhost:3000/signup"
        : "http://localhost:3000/login";
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        alert("Success");
        setShowLogin(false);
      } else {
        alert(response.data.message || "Somthing went wrong");
      }
    } catch (error) {
      console.error("Error", error);
      alert("Error connecting to the server");
    }
  };
  return (
    <div className="login-popup">
      <form action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input type="text" name="name" placeholder="='Your name" required />
          )}
          <input type="text" name="email" placeholder="Your email" required />
          <input type="nu" name="mobile" placeholder="Mobile Number" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
