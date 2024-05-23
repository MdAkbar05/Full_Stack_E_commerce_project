import React, { useState } from "react";

const VerifyUser = () => {
  const [token, setToken] = useState("");

  const handleToken = (e) => {
    setToken(e.target.value);
    console.log(e.target.value);
  };
  const actionAPI = `http://localhost:3000/api/users/verify/${token}`;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
      className="verify-area "
    >
      <form method="post" action={actionAPI}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Token
          </label>
          <input
            type="text"
            name="token"
            onChange={handleToken}
            className="mt-1 block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <button
          className="bg-blue-500 text-white mt-2 p-2 rounded-md"
          type="submit"
        >
          Verify Account
        </button>
      </form>
    </div>
  );
};

export default VerifyUser;
