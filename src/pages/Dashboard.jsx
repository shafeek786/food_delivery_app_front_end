import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/dashboard");
        console.log(response);

        if (response.data.message) {
          console.log(response);
          setMessage(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        if (error.response) {
          if (error.response.status === 401) {
            setError("Unauthorized access. Please log in.");
            navigate("/login"); // Redirect to login page
          } else {
            setError(
              `Error: ${error.response.status} ${error.response.statusText}`
            );
          }
        } else {
          setError("An error occurred while fetching data.");
        }
      }
    };

    fetchData();
  }, [navigate]);

  return <div>{error ? <h1>{error}</h1> : <h1>{message}</h1>}</div>;
};

export default Dashboard;
