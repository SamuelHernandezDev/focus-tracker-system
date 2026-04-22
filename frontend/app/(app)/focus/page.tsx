"use client";

import { useState } from "react";
import {
  Brain,
  Globe,
  Camera,
  PlayCircle,
  StopCircle,
  Activity,
  UserCheck,
  AlertCircle,
} from "lucide-react";

import { useFocusSession } from "@/modules/focus/hooks/useFocusSession";
import FocusDetector from "@/components/focus/Detector"; 

export default function FocusPage() {
  const [task, setTask] = useState("");
  const [allowedSites, setAllowedSites] = useState("");
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("Esperando...");

  const { start, stop, sessionActive, loading } = useFocusSession();

  //INICIO
  const handleStart = async () => {
    if (!task) return alert("Agregue una tarea antes de comenzar.");

    try {
      await start(
        task,
        allowedSites
          ? allowedSites.split(",").map((s) => s.trim())
          : []
      );
    } catch {
      alert("Error al empezar sesion");
    }
  };

  //FINAL
  const handleStop = async () => {
    try {
      const result = await stop();
      alert(`Score: ${result?.score}`);
    } catch {
      alert("Error deteniendo sesion");
    }
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">

      {/* ENCABEZADO */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Sesión de Enfoque
        </h1>
        <p className="text-sm text-gray-500">
          Configura e inicia tu sesión de seguimiento de enfoque.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* SETUP */}
          <div className="bg-white rounded-xl p-6 space-y-5 shadow-sm border border-gray-100">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-500 flex items-center gap-2">
                <Brain size={14} />
                Tarea
              </label>
              <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="¿En qué estás trabajando?"
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-gray-500 flex items-center gap-2">
                <Globe size={14} />
                  Sitios permitidos (opcional)
              </label>
              <input
                value={allowedSites}
                onChange={(e) => setAllowedSites(e.target.value)}
                placeholder="e.g. google.com, stackoverflow.com"
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* SENSORES Y CAMARA */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 flex items-center justify-between border-b border-gray-50">
              <div>
                <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Camera size={16} />
                  Detección de Presencia
                </p>
                <p className="text-xs text-gray-400">
                  MediaPipe rastreará tu atención en tiempo real.
                </p>
              </div>

              <button
                onClick={() => setCameraEnabled((prev) => !prev)}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition
                  ${cameraEnabled
                    ? "bg-red-50 text-red-600 border border-red-100"
                    : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                {cameraEnabled ? <StopCircle size={14} /> : <Activity size={14} />}
                {cameraEnabled ? "Desactivar Cámara" : "Activar Cámara"}
              </button>
            </div>

            {/* AREA DE LA CAMARA */}
            {cameraEnabled && (
              <div className="p-6 bg-gray-900 flex flex-col items-center justify-center">
                <FocusDetector onStatusChange={setCurrentStatus} />
                <div className="mt-4 flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                        ${currentStatus === 'Enfocado' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {currentStatus === 'Enfocado' ? <UserCheck size={14} /> : <AlertCircle size={14} />}
                        {currentStatus}
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="space-y-6">
          {/* ESTADO DE SESION */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Sesión de Control</h2>
            
            {!sessionActive ? (
              <button
                onClick={handleStart}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-bold shadow-lg shadow-blue-200 disabled:opacity-50"
              >
                <PlayCircle size={20} />
                INICIAR SESION
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600 font-bold animate-pulse">
                  <Activity size={18} />
                  SEGUIMIENTO EN VIVO
                </div>
                <button
                  onClick={handleStop}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-bold shadow-lg shadow-red-200 disabled:opacity-50"
                >
                  <StopCircle size={20} />
                  FINALIZAR SESION
                </button>
              </div>
            )}
          </div>

          {/* TIPS O INFO ADICIONAL */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-xs text-blue-700 leading-relaxed">
              <strong>Consejo:</strong> Mantén tu rostro bien iluminado y centrado para una mayor precisión en la detección.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}