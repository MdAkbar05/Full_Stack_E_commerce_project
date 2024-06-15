import React, { createContext, useState } from "react";

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const profile = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(profile.isUser);
  const [userName, setUserName] = useState(profile.userName);
  const [img, setImg] = useState(profile.img);

  return (
    <AuthContext.Provider
      value={{ user, setUser, userName, setUserName, img, setImg }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
