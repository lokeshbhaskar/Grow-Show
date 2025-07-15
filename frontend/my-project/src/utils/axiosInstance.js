import axios from "axios";
import { BASE_URL } from "./apiPaths.js";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
///Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        // Token invalid or expired → redirect to login
        localStorage.clear();
        window.location.href = "/login";
      } else if (status === 500) {
        console.error("🚨 Server error. Please try again later.");
      } else if (error.code === "ECONNABORTED") {
        console.error("⏱ Request timed out. Please try again.");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
