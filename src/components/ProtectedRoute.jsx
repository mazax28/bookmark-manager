import  { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const { isAuthenticated, user} = useAuthStore();


  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (isAuthenticated && user && !user.isverified) {
    return <Navigate to="/verify-email" replace />;
  }
  if (isAuthenticated && user && user.isverified) {
    return <Navigate to="/home" replace />;
  }

  // Todo bien, renderiza lo que corresponda
  return children;
}

export default ProtectedRoute;
