// /modules/auth/types/auth.types.ts
export interface User {
    id: string;
    email: string;
  }
  
  export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  }