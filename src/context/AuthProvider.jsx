import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const logout = () => setUser(null);
  const toggleHamburger = () => setIsActive((prev) => !prev);

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, isActive, toggleHamburger }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
