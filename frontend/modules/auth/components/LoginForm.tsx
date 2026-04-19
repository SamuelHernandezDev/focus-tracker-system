//frontend\modules\auth\components\LoginForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [error, setError] = useState("");

  const { login, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const isValid =
    email.trim() !== "" &&
    password.trim() !== "" &&
    /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid || loadingLocal) return;

    try {
      setLoadingLocal(true);
      setError("");

      await login(email, password);

      router.replace("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoadingLocal(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full max-w-sm
        rounded-2xl
        border border-[var(--border)]
        bg-white/90 backdrop-blur-md
        p-8 space-y-6
        shadow-lg
      "
    >
      {/* LOGO + TITLE */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <Image
            src="/images/Logo.png"
            alt="Logo"
            width={36}
            height={36}
            priority
            className="rounded-md"
          />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">
            Welcome back
          </h2>
          <p className="text-sm text-gray-500">
            Sign in to your account
          </p>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 text-center">
          {error}
        </div>
      )}

      {/* EMAIL */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-gray-500">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="
            border border-[var(--border)]
            bg-white
            rounded-lg px-3 py-2.5
            text-sm
            focus:outline-none
            focus:ring-2 focus:ring-[var(--primary)]
            focus:border-transparent
            transition
          "
          value={email}
          disabled={loadingLocal}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
        />
      </div>

      {/* PASSWORD */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-gray-500">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          className="
            border border-[var(--border)]
            bg-white
            rounded-lg px-3 py-2.5
            text-sm
            focus:outline-none
            focus:ring-2 focus:ring-[var(--primary)]
            focus:border-transparent
            transition
          "
          value={password}
          disabled={loadingLocal}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError("");
          }}
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={!isValid || loadingLocal}
        className="
          w-full rounded-lg
          bg-[var(--primary)]
          text-white py-2.5 text-sm font-medium
          shadow-md
          hover:shadow-lg hover:scale-[1.01]
          active:scale-[0.99]
          transition
          disabled:opacity-50
        "
      >
        {loadingLocal ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}