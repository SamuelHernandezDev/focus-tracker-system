// /modules/auth/hooks/useLogin.ts
export function useLogin() {
    const login = async (email: string, password: string) => {
      // aquí irá API call
    };
  
    return { login };
  }