// frontend\src\App.tsx
import { Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Session from "./pages/Session"

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/Session" element={<Session />} />
    </Routes>
  )
}

export default App