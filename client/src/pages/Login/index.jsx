import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../Helpers/UsersContext";

const Login = () => {
  const { setUser, setUserName, setImg } = useContext(AuthContext);
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
    e.preventDefault();
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    console.log(data);

    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
        {
          headers: {
            "Content-Type": "multipart/formData",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setUser(true);
        setUserName(response.data.payload.userExits.name);
        setImg(response.data.payload.userExits.image);
        navigate("/");
      }
    } catch (error) {
      console.error(
        "There was a problem with the registration request:",
        error.response.data.message
      );
      alert(error.response.data.message);
    }
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

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
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
