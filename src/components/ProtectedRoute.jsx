import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated());
  
  // Solo verificamos si el usuario está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Si está autenticado, mostramos el contenido
  return children;
}

export default ProtectedRoute;