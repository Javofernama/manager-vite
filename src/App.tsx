import type React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import AppLayout from "./components/AppLayout"

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<AppLayout />}>
      <Route path="/home" element={<Home />} />
      {/* Add more routes here as needed */}
      </Route>
    </Routes>
  )
}

export default App

