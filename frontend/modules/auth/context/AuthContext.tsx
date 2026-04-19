//frontend\modules\auth\context\AuthContext.tsx
"use client";

import { useEffect, createContext, useState } from "react";
import { AuthContextType, User } from "../types/auth.types";
import { loginRequest, getMeRequest, logoutRequest } from "@/services/auth/auth.service";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // LOGIN 
  const login = async (email: string, password: string): Promise<User> => {
    const res = await loginRequest(email, password);

    setUser(res.user);

    return res.user;
  };

  const logout = async () => {
    try {
      await logoutRequest(); 
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      setUser(null); 
    }
  };

  // RESTORE SESSION 
  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await getMeRequest();

        setUser(res.user); 
      } catch {
        setUser(null); 
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}