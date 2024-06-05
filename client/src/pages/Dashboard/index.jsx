import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [toastMSG, setToastMSG] = useState("");
  const [isUpdate, setisUpdate] = useState(false);
  const [id, setId] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const navigate = useNavigate();

  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // Fetching users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      const data = await response.json();
      setUsers(data.payload.users);
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/users/${id}`
      );
      console.log(response);
      if (response.status === 201) {
        setToastMSG("The user was deleted!");
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (error) {
      setToastMSG("Error with deleting Users");
    }
  };

  // Update an user
  const handleChange = (e) => {
    const { name, value, files } = e.currentTarget;
    if (name === "image") {
      setUpdatedUser((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else {
      setUpdatedUser((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:3000/api/users/${id}`,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
        }
      );
      if (res.status == 200) {
        setToastMSG("User was updated");
        fetchUsers();
        setisUpdate(false);
      }
    } catch (error) {
      setToastMSG("Error with updating Users");
    }
  };

  setTimeout(() => {
    setToastMSG("");
  }, 5000);
  return (
    <>
      <main className="text-center pt-5 text-4xl">
        <h2 className="text-center text-red-500">All Users List</h2>
        <div className=" mt-6">
          {isUpdate && (
            <>
              <div className="max-w-md mx-auto mt-10 mb-10">
                <p className="text-center text-2xl px-2 py-2 text-blue-700">
                  Update Your information
                </p>
                <form onSubmit={handleUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={updatedUser.name}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={updatedUser.address}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={updatedUser.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
              {toastMSG && (
                <p className="text-center absolute top-16 text-green-700 bg-green-200 left-3 w-full text-sm">
                  {toastMSG}
                </p>
              )}
            </>
          )}

          {/* ///////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <table className="w-full   bg-white border border-gray-200 text-center">
            {isLoading ? (
              <p className="text-center mt-20 w-full text-base">
                Users Loading...wait a second!{" "}
              </p>
            ) : (
              <>
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-sm py-2 px-4 border-b">Image</th>
                    <th className="text-sm py-2 px-4 border-b">Name</th>
                    <th className="text-sm py-2 px-4 border-b">Email</th>
                    <th className="text-sm py-2 px-4 border-b">Address</th>
                    <th className="text-sm py-2 px-4 border-b">Phone</th>
                    <th className="text-sm py-2 px-4 border-b">Action</th>
                  </tr>
                </thead>

                <tbody className="overflow-y-scroll">
                  {users.map((user) => (
                    <tr key={user._id} className="text-left">
                      <td className="py-2 px-4 border-b">
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-10 h-10 rounded-full mx-auto"
                        />
                      </td>
                      <td className="text-sm py-2 px-4 border-b">
                        {user.name}
                      </td>
                      <td className="text-sm py-2 px-4 border-b">
                        {user.email}
                      </td>
                      <td className="text-sm py-2 px-4 border-b">
                        {user.address}
                      </td>
                      <td className="text-sm py-2 px-4 border-b">
                        {user.phone}
                      </td>
                      <td className="text-sm px-4 border-b space-x-2">
                        <button
                          className="text-sm w-auto h-8 bg-red-500 text-white px-2 rounded-lg"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            setId(user._id);
                            setisUpdate(true);
                            console.log(id);
                          }}
                          className="text-sm w-auto h-8 bg-red-500 text-white px-2 rounded-lg"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
          <div className="flex justify-start text-sm px-10 mt-4">
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded-lg"
              onClick={() => {
                navigate("/process-register");
              }}
            >
              Add User
            </button>
          </div>
          {toastMSG && (
            <p className="text-center absolute top-16 text-green-700 bg-green-200 left-3 w-full text-sm">
              {toastMSG}
            </p>
          )}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
