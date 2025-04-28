import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"
import VerificationPage from "./pages/VerificationPage"
import { Toaster } from "react-hot-toast"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Routes, Route } from "react-router-dom"


function App() {

  return (
    <div className="min-h screen">
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/verify-email" element={<VerificationPage />} />

        </Routes>
      <Toaster/>
    </div>
  )
}

export default App
