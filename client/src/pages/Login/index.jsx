import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../Helpers/UsersContext";
// reactIcon
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
const Login = () => {
  const [loading, setloading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setUser, setUserName, setImg, setEmail, setAddress, setID } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
        {
          headers: {
            "Content-Type": "multipart/formData",
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensure cookies are sent
        }
      );
      console.log(response);
      if (response.status === 200) {
        // Save user state to localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            isUser: true,
            userName: response.data.payload.users.name,
            img: response.data.payload.users.image,
            email: response.data.payload.users.email,
            address: response.data.payload.users.address,
            id: response.data.payload.users._id,
          })
        );
        const profile = JSON.parse(localStorage.getItem("user"));
        setUser(profile.isUser);
        setUserName(profile.userName);
        setImg(profile.img);
        setEmail(profile.email);
        setAddress(profile.address);
        setloading(false);
        setID(profile.id);
        navigate("/");
      }
    } catch (error) {
      console.error(
        "There was a problem with the registration request:",
        error.response.data.message
      );
      setloading(false);
      alert(error.response.data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <p className="text-center text-2xl px-2 py-2 text-blue-700">
        Login Your Accounts
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <span
            className="absolute right-2 top-9 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaRegEye />}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <Link
            to="/forget-pass"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            Forgot Password?
          </Link>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
      <div className="mt-4">
        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-slate-300 hover:bg-slate-500-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {
            navigate("/register");
          }}
        >
          Create New Account?
        </button>
      </div>
    </div>
  );
};

export default Login;
