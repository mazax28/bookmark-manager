import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import { Toaster } from "react-hot-toast"
import { Routes, Route } from "react-router-dom"
import FolderPage from "./pages/FolderPage"
import BookmarkPage from "./pages/BookmarkPage"
import { useThemeStore } from "./store/themeStore"
import DasboardPage from "./pages/DashboardPage"


function App() {
  const {theme} = useThemeStore()

  return (
    <div className="min-h-screen" data-theme={theme}>
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
        
        {/* Rutas protegidas (sin verificación) */}
        <Route path="/folders" element={
          <ProtectedRoute>
            <FolderPage />
          </ProtectedRoute>
        } />
        
        <Route path="/bookmarks" element={
          <ProtectedRoute>
            <BookmarkPage />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DasboardPage />
          </ProtectedRoute>
        } />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
