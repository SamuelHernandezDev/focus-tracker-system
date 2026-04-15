"use client";
import { useState } from "react";
import Detector from "@/modules/auth/sensor/components/Detector";

export default function TestSensorPage() {
  const [status, setStatus] = useState("Iniciando...");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black p-10">
      <h1 className="text-3xl font-bold mb-6">Prueba de Enfoque</h1>
      
      {/* Aquí llamamos al detector que acabas de configurar arriba */}
      <div className="border-4 border-black rounded-2xl p-2 shadow-2xl">
        <Detector onStatusChange={(s) => setStatus(s)} />
      </div>

      <div className="mt-10 p-4 bg-gray-100 rounded-lg w-full max-w-md text-center">
        <p className="text-sm text-gray-500 uppercase">Estado actual:</p>
        <p className="text-2xl font-black text-black mt-2">{status}</p>
      </div>
    </main>
  );
}