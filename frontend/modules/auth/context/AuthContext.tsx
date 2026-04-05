//frontend\modules\auth\context\AuthContext.tsx
"use client";

import { useEffect, createContext, useState } from "react";
import { AuthContextType, User } from "../types/auth.types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    await new Promise((res) => setTimeout(res, 500));

    const mockUser: User = {
      id: "1",
      email,
    };

    setUser(mockUser);
    localStorage.setItem("auth_user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("auth_user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      localStorage.removeItem("auth_user");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}