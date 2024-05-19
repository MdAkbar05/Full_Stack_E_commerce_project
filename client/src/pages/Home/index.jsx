import React, { useEffect, useState } from "react";
import axios from "axios";
export const Home = () => {
  const [users, setUsers] = useState([]);
  const [userId, setuserId] = useState("");
  const [toastMSG, settoastMSG] = useState("");
  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.payload.users);
      });
  }, [userId]);

  const handleDelete = () => {
    try {
      const response = axios.delete(
        `http://localhost:3000/api/users/${userId}`
      );
      if (response) {
        settoastMSG("The user was deleted!");
      }
    } catch (error) {
      settoastMSG("Error with deleting Users");
    }
  };
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
                  <td className="text-sm  px-4 border-b space-x-2">
                    <button
                      className="text-sm w-auto h-8 bg-red-500 text-white px-2 rounded-lg"
                      onClick={() => {
                        setuserId(user._id);
                        handleDelete();
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="text-sm w-auto h-8 bg-red-500 text-white  px-2 rounded-lg"
                      onClick={() => {}}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-center absolute top-16 text-green-700 bg-green-200 left-3 w-full text-sm">
            {toastMSG}
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
