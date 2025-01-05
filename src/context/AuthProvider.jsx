import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { handleApiError } from "../utils/handleApiError";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const userFromLS = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(userFromLS || null);
  const [token, setToken] = useState(userFromLS?.accessToken || null);

  const [searchParam, setSearchParam] = useState("");

  const [isActive, setIsActive] = useState(false);

  const logout = () => {
    try {
      localStorage.removeItem("user");
      setUser(null);
      window.location.href = "/login";
      toast.success("Logged out successfully.");
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.log(errorMessage);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const toggleHamburger = () => setIsActive((prev) => !prev);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        isActive,
        toggleHamburger,
        token,
        setToken,
        searchParam,
        setSearchParam,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
