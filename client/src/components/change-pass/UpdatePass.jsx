import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Helpers/UsersContext";
import axios from "axios";

const UpdatePass = () => {
  const [isNewPass, setIsNewPass] = useState(true);
  const { userID } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
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
    data.append("oldPassword", formData.oldPassword);
    data.append("newPassword", formData.newPassword);
    data.append("confirmPassword", formData.confirmPassword);

    try {
      console.log(data);
      const response = await axios.put(
        `http://localhost:3000/api/users/update-password/${userID}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/formData",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response.data);

      navigate("/profile-user"); // Redirect to the users page after successful update password
    } catch (error) {
      console.error(
        "There was a problem with the change password request:",
        error.response.data.message
      );
      alert(error.response.data.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-auto h-96">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start border p-8 bg-sl"
      >
        <label for="email">Current email:</label>
        <input
          className="border rounded-md p-2 focus:outline-red-400"
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          required
        />
        <label for="oldPassword">Current Password:</label>
        <input
          className="border rounded-md p-2 focus:outline-red-400"
          type="password"
          id="oldPassword"
          name="oldPassword"
          onChange={handleChange}
          required
        />
        <label for="newPassword">New Password:</label>
        <input
          className="border rounded-md p-2 focus:outline-red-400"
          type="password"
          id="newPassword"
          name="newPassword"
          onChange={handleChange}
          required
        />
        <label for="confirmPassword">Confirm New Password:</label>
        <input
          className="border rounded-md p-2 focus:outline-red-400"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleChange}
          required
        />

        <input
          className={`p-2 mt-2 bg-slate-100 hover:bg-slate-50 text-red-400 rounded-2xl ${
            isNewPass ? `cursor-pointer` : `cursor-not-allowed`
          }`}
          type="submit"
          disabled={!isNewPass}
          value="Update Password"
        />
      </form>
    </div>
  );
};

export default UpdatePass;
