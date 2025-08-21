// src/components/ProtectedAdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";

export default function ProtectedAdminRoute({ children }) {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn || !user?.isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
