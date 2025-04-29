import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function ProtectedRoute({ children }) {
  const { isAuthenticated,user } = useAuthStore();

  if (!isAuthenticated) {
    // Si no está autenticado, lo redirige a login
    return <Navigate to="/auth" replace />;
  }
  if (isAuthenticated && user.isverified){
    return <Navigate to="/home" replace />;
  }
  if (isAuthenticated && !user.isverified){
    return <Navigate to="/verify-email" replace />;
  }

  

  // Si está autenticado, renderiza el componente hijo
  return children;
}

export default ProtectedRoute;
