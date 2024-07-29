import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { success } from "toastr";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  const checkAuth = async () => {
    try {
      const response = await axios.get("/auth/check-auth", {
        withCredentials: true,
      });
      setIsAuthenticated(response.data.isAuthenticated);
      setUserId(response.data.id || "");
    } catch (error) {
      setIsAuthenticated(false);
      setUserId("");
    }
  };

  const getUser = async (id) => {
    try {
      console.log("get user");
      const response = await axios.get(`/user/getuser/${id}`, {
        withCredentials: true,
      });
      setUserDetails(response.data);
      console.log("user:", userDetails);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const updateUser = async (id, data) => {
    try {
      console.log("image");
      const response = await axios.post(`/user/updateuser/${id}`, data, {
        withCredentials: true,
      });
      console.log(response.status);
      if (response.status !== 201) {
        throw new Error(response.data.message || "Failed to update user");
      }
      setUserDetails(response.data);
      return { success: true };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.response?.data?.message || "Unable to update User",
      };
    }
  };
  useEffect(() => {
    const fetchAuthAndUser = async () => {
      await checkAuth();
      if (userId) {
        console.log("id");
        await getUser(userId);
      }
    };
    fetchAuthAndUser();
  }, [userId]);

  const isLogin = async () => {
    await checkAuth();
    if (userId) {
      await getUser(userId);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUserId("");
      setUserDetails(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userId,
        userDetails,
        isLogin,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
