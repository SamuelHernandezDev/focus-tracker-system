//frontend\modules\auth\context\AuthContext.tsx
"use client";

import { createContext, useState } from "react";
import { AuthContextType, User } from "../types/auth.types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 🔹 Mock login (por ahora)
  const login = async (email: string, password: string) => {
    // simula llamada async
    await new Promise((res) => setTimeout(res, 500));

    const mockUser: User = {
      id: "1",
      email,
    };

    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}