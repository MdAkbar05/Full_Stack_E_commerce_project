import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [users, setUsers] = useState([]);
  const [toastMSG, setToastMSG] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      const data = await response.json();
      setUsers(data.payload.users);
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

  setTimeout(() => {
    setToastMSG("");
  }, 10000);
  return (
    <>
      <main className="text-center pt-5 text-4xl">
        <h2 className="text-center text-red-500">All Users List</h2>
        <div className="overflow-x-auto mt-6">
          <table className="w-full bg-white border border-gray-200 text-center">
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
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="text-left">
                  <td className="py-2 px-4 border-b">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="text-sm py-2 px-4 border-b">{user.name}</td>
                  <td className="text-sm py-2 px-4 border-b">{user.email}</td>
                  <td className="text-sm py-2 px-4 border-b">{user.address}</td>
                  <td className="text-sm py-2 px-4 border-b">{user.phone}</td>
                  <td className="text-sm px-4 border-b space-x-2">
                    <button
                      className="text-sm w-auto h-8 bg-red-500 text-white px-2 rounded-lg"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                    <button className="text-sm w-auto h-8 bg-red-500 text-white px-2 rounded-lg">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
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

export default Home;
