import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("check auth", isAuthenticated);
  useEffect(() => {
    console.log("check auth 2", isAuthenticated);

    const checkAuth = async () => {
      console.log("check auth 4", isAuthenticated);

      try {
        console.log("check auth 6:");
        const response = await axios.get("/auth/check-auth", {
          withCredentials: true,
        });
        console.log("check auth 5", isAuthenticated);

        console.log("res", response);
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
    console.log("check auth 3", isAuthenticated);
  }, []);

  useEffect(() => {
    console.log(isAuthenticated);
  });
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
