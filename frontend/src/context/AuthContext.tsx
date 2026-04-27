import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthUser } from "../types/auth";
import { getStoredToken, setStoredToken, clearStoredToken } from "../services/authStorage";

interface AuthContextValue {
  isAuthenticated: boolean;
  token: string | null;
  user: AuthUser | null;
  login: (token: string, user?: AuthUser | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = getStoredToken();
    if (stored) {
      setToken(stored);
      // Si tu backend devuelve info del usuario, podrías cargarla acá con un /me
    }
  }, []);

  const login = (newToken: string, userData: AuthUser | null = null) => {
    setToken(newToken);
    setStoredToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    clearStoredToken();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
  }
  return ctx;
};
