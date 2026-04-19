//frontend\services\auth.service.ts
import type { User } from "@/modules/auth/types/auth.types";

async function handleResponse(res: Response) {
  if (res.status === 401) {
    if (
      typeof window !== "undefined" &&
      window.location.pathname !== "/login"
    ) {
      window.location.href = "/login";
    }

    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return res.json();
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// LOGIN
export async function loginRequest(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(res);
}

// RESTORE SESSION
export async function getMeRequest(): Promise<{ user: User }> {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  return handleResponse(res);
}

// LOGOUT
export async function logoutRequest() {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return handleResponse(res);
}