// frontend\src\layouts\MainLayout.tsx
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold">Enfoque</h2>
        <nav className="mt-4 space-y-2">
          <a href="/" className="block">Dashboard</a>
          <a href="/login" className="block">Login</a>
          <a href="/Session" className="block">Session</a>
        </nav>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  )
}