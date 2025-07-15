import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
  // console.log(user);
  useEffect(() => {
    if (user) return;
    const accessToken = localStorage.getItem("token");
    // console.log(accessToken)
    if (!accessToken) {
    //   setLoading(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.USER.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser();
      } finally {
        // setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const updateUser = (userDate) => {
    setUser(userDate);
    localStorage.setItem("token", userDate.token);
    // setLoading(false);
  };
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;