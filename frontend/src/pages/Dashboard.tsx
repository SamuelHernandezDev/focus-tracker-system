function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      
      {/* Título */}
      <h1 className="text-4xl font-bold mb-6">
        Focus Tracker Dashboard 🚀
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-lg text-gray-400">Índice de Concentración</h2>
          <p className="text-3xl font-bold text-green-400 mt-2">0.82</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-lg text-gray-400">Índice de Fragmentación</h2>
          <p className="text-3xl font-bold text-yellow-400 mt-2">0.25</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-lg text-gray-400">IGE</h2>
          <p className="text-3xl font-bold text-blue-400 mt-2">0.41</p>
        </div>

      </div>

      {/* Sección inferior */}
      <div className="mt-10 bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Estado actual</h2>
        <p className="text-gray-300">
          Sesión activa con buen nivel de enfoque.
        </p>
      </div>

    </div>
  )
}

export default Dashboard