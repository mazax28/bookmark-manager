import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router-dom"
import {logoutUser} from "../api/authApi"
import ThemeController from "./ThemeController"
import {Link} from "react-router-dom"

function Navbar() {
  const {logout, isAuthenticated} = useAuthStore()
  console.log('isAuthenticated:', isAuthenticated())  // Nota: Llamada a la función aquí para debugging

  const navigate = useNavigate()
  const {mutate, isPending} = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout()
      navigate('/auth')
    },
    onError: (error) => {
      console.error('Error al cerrar sesión:', error);
    }
  });
  
  const handleLogout = () => {
    mutate()
  }
  
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        {
          // CORRECCIÓN: Si está autenticado, mostrar el menú desplegable
          isAuthenticated() ? (
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li><Link to="bookmarks">Bookmarks</Link></li>
                <li><Link to="folders">Folders</Link></li>
                <li><Link to="dashboard">Dashboard</Link></li>
              </ul>
            </div>
          ) : (
            // Si NO está autenticado, mostrar enlace Home
            <Link to="/" className="btn btn-ghost text-xl">
              Home
            </Link>
          )
        }
        <a className="btn btn-ghost text-xl">BookmarkHub</a>
      </div>
      
      <div className="navbar-end space-x-4">
        <ThemeController />
        {
          // CORRECCIÓN: Si está autenticado, mostrar el avatar y menú de usuario
          isAuthenticated() ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li onClick={handleLogout}><a>Logout</a>{isPending ? (<span className="loading loading-ring loading-xs"></span>) : ''}</li>
              </ul>
            </div>
          ) : (
            // Si NO está autenticado, mostrar botón de iniciar sesión
            <Link to="/auth" className="btn btn-neutral">
              Iniciar Sesión
            </Link>
          )
        }
      </div>
    </div>
  )
}

export default Navbar
