//frontend\modules\ui\components\sidebar\settingsModal.tsx
"use client";

export default function SettingsModal({ open, onClose }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative bg-gray-900 border border-gray-800 rounded-xl w-[500px] p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-4">
          Settings
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          Aquí irán las configuraciones de la aplicación.
        </p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-800 rounded-md hover:bg-gray-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}