import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"
import VerificationPage from "./pages/VerificationPage"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import { Toaster } from "react-hot-toast"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Routes, Route } from "react-router-dom"
import FolderPage from "./pages/FolderPage"
import BookmarkPage from "./pages/BookmarkPage"
import { useThemeStore } from "./store/themeStore"


function App() {
  const {theme} = useThemeStore()

  return (
    <div className="min-h-screen" data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        
        <Route path="/verify-email" element={
            <VerificationPage />
        } />

        <Route path="/home" element={
            <HomePage />
        } />
        <Route path="/folders" element={<FolderPage />} />
        <Route path="/bookmarks" element={<BookmarkPage />} />

        
        
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
