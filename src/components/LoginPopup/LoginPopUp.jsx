import React, { useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import "./LoginPopup.css";
import toastr from "toastr";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPopUp = ({ setShowLogin }) => {
  const userRef = useRef();
  const emailRef = useRef();
  const [currState, setCurrState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setValidName(USER_REGEX.test(formData.name));
  }, [formData.name]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(formData.email));
  }, [formData.email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = currState === "Sign up" ? "/signup" : "/login";

    try {
      console.log("check");
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.message) {
        if (currState === "Sign up") {
          toastr.success("Success, please login");
          setCurrState("Login");
        } else {
          console.log("login");
          toastr.success("Success");
          setShowLogin(false);
          navigate("/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toastr.error("Conflict: The email or mobile number already exists.");
      } else if (error.response && error.response.status === 401) {
        console.log(error.response.data);
        toastr.error(error.response.data.message);
      } else {
        toastr.error("Error connecting to the server");
      }
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? null : (
            <div className="input-container">
              <input
                type="text"
                id="username"
                name="name"
                ref={userRef}
                placeholder="Your name"
                required
                autoComplete="off"
                onChange={handleChange}
                value={formData.name}
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && formData.name && !validName
                    ? "instructions"
                    : "offscreen"
                }
              >
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>
          )}
          <input
            type="text"
            id="email"
            name="email"
            ref={emailRef}
            placeholder="Your email"
            required
            autoComplete="off"
            onChange={handleChange}
            value={formData.email}
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emailnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="emailnote"
            className={
              emailFocus && formData.email && !validEmail
                ? "instructions"
                : "offscreen"
            }
          >
            Please enter a valid email address.
          </p>
          {currState === "Login" ? null : (
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              required
              onChange={handleChange}
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
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
