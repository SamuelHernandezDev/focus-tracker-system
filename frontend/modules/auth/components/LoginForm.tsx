//frontend\modules\auth\components\LoginForm.tsx
"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    console.log("Login attempt:", { email, password });

    // aquí luego conectamos con backend
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-4 rounded-xl border p-6 shadow"
    >
      <h2 className="text-xl font-semibold text-center">Login</h2>

      {/* Email */}
      <div className="flex flex-col">
        <label className="text-sm mb-1">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label className="text-sm mb-1">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={!isValid}
        className="w-full rounded-md bg-blue-600 text-white py-2 hover:bg-blue-700 disabled:bg-gray-400"
      >
        Login
      </button>
    </form>
  );
}