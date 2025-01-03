import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/ContextHooks";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const token = user?.accessToken;

  useEffect(() => {
    if (!token || user?.role !== "ADMIN") {
      navigate("/login");
    }
    if (token && user?.role === "USER") {
      navigate("/waiting");
    }
  }, [token, user?.role]);

  return children;
};

export default ProtectedRoute;
