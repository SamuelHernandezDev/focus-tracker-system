//frontend\app\(app)\focus\page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Brain,
  Globe,
  Camera,
  PlayCircle,
  StopCircle,
  Activity,
} from "lucide-react";

import {
  startSessionRequest,
  stopSessionRequest,
  sendEventRequest,
} from "@/services/session/session.service";

export default function FocusPage() {
  const [task, setTask] = useState("");
  const [allowedSites, setAllowedSites] = useState("");
  const [cameraEnabled, setCameraEnabled] = useState(false);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionActive, setSessionActive] = useState(false);
  const [loading, setLoading] = useState(false);

  // ======================
  // START SESSION
  // ======================
  const handleStart = async () => {
    if (!task) return alert("Add a task before starting");

    try {
      setLoading(true);

      const res = await startSessionRequest({
        task,
        allowedSites: allowedSites
          ? allowedSites.split(",").map((s) => s.trim())
          : [],
      });

      setSessionId(res.id);
      setSessionActive(true);
    } catch (err) {
      console.error(err);
      alert("Error starting session");
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // STOP SESSION
  // ======================
  const handleStop = async () => {
    if (!sessionId) return;

    try {
      setLoading(true);

      const result = await stopSessionRequest(sessionId);

      console.log("Session result:", result);

      // aquí luego mostramos métricas en UI
      alert(`Score: ${result.score}`);

      setSessionActive(false);
      setSessionId(null);
    } catch (err) {
      console.error(err);
      alert("Error stopping session");
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // EVENT LOOP (MVP)
  // ======================
  useEffect(() => {
    if (!sessionActive || !sessionId) return;

    const interval = setInterval(() => {
      sendEventRequest({
        sessionId,
        type: "ACTIVE",
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [sessionActive, sessionId]);

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Focus Session
        </h1>
        <p className="text-sm text-gray-500">
          Configure and start your focus tracking session
        </p>
      </div>

      {/* SETUP */}
      <div className="bg-white rounded-xl p-6 space-y-5 shadow-sm">

        {/* TASK */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-500 flex items-center gap-2">
            <Brain size={14} />
            Task
          </label>

          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What are you working on?"
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* CONTEXT (OPCIONAL) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-500 flex items-center gap-2">
            <Globe size={14} />
            Allowed Sites (optional)
          </label>

          <input
            value={allowedSites}
            onChange={(e) => setAllowedSites(e.target.value)}
            placeholder="Optional: limit distractions (future feature)"
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      {/* SENSORS */}
      <div className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Camera size={16} />
            Presence Detection
          </p>
          <p className="text-xs text-gray-400">
            Camera is used to detect attention (not recorded)
          </p>
        </div>

        <button
          onClick={() => setCameraEnabled((prev) => !prev)}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition
            ${cameraEnabled
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          <Activity size={14} />
          {cameraEnabled ? "Enabled" : "Enable"}
        </button>
      </div>

      {/* STATUS */}
      {sessionActive && (
        <div className="bg-white rounded-xl border p-6 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <Activity size={16} />
            Session Active
          </div>

          <span className="text-sm text-gray-500">
            Tracking your focus in real time...
          </span>
        </div>
      )}

      {/* CONTROLS */}
      <div className="flex gap-3">
        {!sessionActive ? (
          <button
            onClick={handleStart}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
          >
            <PlayCircle size={18} />
            Start Session
          </button>
        ) : (
          <button
            onClick={handleStop}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium disabled:opacity-50"
          >
            <StopCircle size={18} />
            Stop Session
          </button>
        )}
      </div>

    </div>
  );
}