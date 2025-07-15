import React, { useState , useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import leaf from "../../assets/download.png";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updateUser }  = useContext(UserContext)

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter a valid password");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      updateUser(response.data);
      navigate("/");
    } catch (error) {
       if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-green-100 text-green-700 font-sans">
      <h1 className="text-4xl font-bold mb-2">Grow&Show</h1>
      <div className="mb-4">
        <img src={leaf} alt="Plant Icon" className="h-16 w-20 mx-auto" />
      </div>
      <div>
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-lg p-8 w-80 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button
            className="w-full py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold"
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
      <p className="mt-4 text-green-600 text-sm ">
        Don’t have an account?
        <Link to="/signup">
          <span className="font-bold underline cursor-pointer ">Sign Up</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
