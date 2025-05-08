import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router-dom"
import {logoutUser} from "../api/authApi"
import ThemeController from "./ThemeController"
import {Link} from "react-router-dom"
function Navbar() {
  const {logout} = useAuthStore()
  const navigate = useNavigate()
  const {mutate,isPending} = useMutation({
    mutationFn: () => {
      // Aquí puedes realizar la acción de cerrar sesión
      console.log('Cerrar sesión');
      logoutUser()
    },

    onSuccess: (data) => {
      // Aquí puedes manejar la respuesta después de cerrar sesión
      logout()
      navigate('/auth')

      console.log('Sesión cerrada:', data);
    },
    onError: (error) => {
      // Aquí puedes manejar el error al cerrar sesión
      console.error('Error al cerrar sesión:', error);
    }
  });
  const handleLogout = () => {
    console.log('Cerrar sesión');
    mutate()
  }
  return (
<div className="navbar bg-base-100 shadow-sm">
    <div className="navbar-start">
        {/* comentado por ahora */}
        {/* <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
        </div>
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a>Item 1</a></li>
            <li>
            <a>Parent</a>
            <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
            </ul>
            </li>
            <li><a>Item 3</a></li>
        </ul>
        </div> */}
        <a className="btn btn-ghost text-xl">BookmarkHub</a>
    </div>
    {/* Comentado por ahora */}
    <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        <li><Link to="bookmarks">Bookmarks</Link></li>
        <li><Link to="folders">Folders</Link></li>
        <li><Link to="dashboard">Dashboard</Link></li>
        </ul>
    </div>
    <div className="navbar-end space-x-4">
      <ThemeController />
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
        <li onClick={handleLogout}><a>Logout</a>{isPending ? (<span className="loading loading-ring loading-xs"></span>
):('') }</li>
      </ul>
    </div>
    </div>
</div>
  )
}

export default Navbar
