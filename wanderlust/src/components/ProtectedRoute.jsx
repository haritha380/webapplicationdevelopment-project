import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
 
  

  if (!isLoggedIn) {
 
    return <Navigate to="/login" replace />;
  }

  return children;
}
