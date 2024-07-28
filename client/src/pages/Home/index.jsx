import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../Helpers/UsersContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  // const { isLoading, isError, data } = useFetch(
  //   "http://localhost:3000/api/users"
  // );
  // const users = data;

  return (
    <div>
      <div className="text-lg">Welcome to Home</div>
    </div>
  );
};

export default Home;
