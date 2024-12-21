import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaUserAlt,
  FaHeart,
  FaUser,
  FaLockOpen,
  FaMailBulk,
  FaAddressBook,
  FaLocationArrow,
} from "react-icons/fa";
import useAuth from "../../useAuth";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authUser } = useSelector((state) => state.authReducer);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log(JSON.parse(localStorage.getItem("user")));
  }, [authUser, location, navigate]);

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 font-serif">
      {user && user.isUser ? (
        <div className="max-w-lg mx-auto rounded shadow-md overflow-hidden">
          {/* header of profile  */}
          <div className="bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-2">Profile</h1>
            <p className="text-gray-600">Overview of your profile</p>
          </div>
          {/* main section of profile  */}
          <div className="flex flex-wrap mx-4">
            <div className="w-1/3 md:w-1/3 px-2 py-2 mb-4 md:mb-0 mx-auto border border-red-500 rounded-3xl flexCenter">
              <img
                src={user.img}
                alt={user.userName}
                className="rounded-3xl size-full"
              />
            </div>
            <div className="w-full md:w-2/3 px-4 py-4">
              <div className="profile-details flex flex-col justify-start">
                {/* name  */}
                <p className="text-lg text-gray-600  mb-2 flex items-center gap-2">
                  <span>
                    <FaUserAlt />
                  </span>{" "}
                  <span className="text-red-400">{user.userName}</span>
                </p>
                {/* email  */}
                <p className="text-gray-600 mb-2 flex items-center gap-2">
                  <span>
                    <FaMailBulk />
                  </span>{" "}
                  <span className="text-red-400">{user.email}</span>
                </p>
                {/* address  */}
                <p className="text-gray-600 mb-2 flex items-center gap-2">
                  <span>
                    <FaLocationArrow />
                  </span>{" "}
                  <span className="text-red-400">{user?.address}</span>
                </p>
                {user.admin ? (
                  <span className="text-red-400">Admin</span>
                ) : (
                  <span className="text-red-400">User</span>
                )}
              </div>
            </div>
          </div>
          {user.userType === "googleProvider" ? (
            <div className="flex justify-center my-4">
              You can't change anything of profile
            </div>
          ) : (
            <div className="flex justify-center my-4">
              <Link
                to="/update-profile"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit Profile
              </Link>
              <Link
                to="/change-pass"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ml-2"
              >
                Change Password
              </Link>
            </div>
          )}
          <div className="flex justify-center mb-4">
            <p className="text-lg font-bold mr-4">
              Posts: <span className="text-gray-600">10</span>
            </p>
            <p className="text-lg font-bold mr-4">
              Followers: <span className="text-gray-600">50</span>
            </p>
            <p className="text-lg font-bold">
              Following: <span className="text-gray-600">20</span>
            </p>
          </div>
        </div>
      ) : (
        <h2>You have sign't out. Please Login first.</h2>
      )}
    </div>
  );
};

export default Profile;
