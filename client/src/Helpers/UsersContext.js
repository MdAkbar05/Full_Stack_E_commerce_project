import React, { createContext, useState } from "react";

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [userName, setUserName] = useState(false);
  const [img, setImg] = useState("");

  return (
    <AuthContext.Provider
      value={{ user, setUser, userName, setUserName, img, setImg }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
