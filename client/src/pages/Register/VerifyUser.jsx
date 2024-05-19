import React, { useState } from "react";

const VerifyUser = () => {
  const [token, setToken] = useState("");

  const handleToken = (e) => {
    setToken(e.target.value);
    console.log(e.target.value);
  };
  const actionAPI = `http://localhost:3000/api/users/verify/${token}`;
  return (
    <form method="post" action={actionAPI}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Token</label>
        <input
          type="text"
          name="token"
          onChange={handleToken}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <button type="submit">Verify Account</button>
    </form>
  );
};

export default VerifyUser;
