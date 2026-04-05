//frontend\modules\auth\components\LoginForm.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const isValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) return;

    await login(email, password);

    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold text-center">Welcome back</h2>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="border border-[var(--border)] bg-transparent rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-500">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          className="border border-[var(--border)] bg-transparent rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={!isValid}
        className="w-full rounded-md bg-[var(--primary)] text-white py-2 font-medium hover:opacity-90 transition disabled:opacity-50"
      >
        Login
      </button>
    </form>
  );
}