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
function getTokenExpirationTime(token: string): number | null {
  try {
    const payloadBase64 = token.split(".")[1];

    if (!payloadBase64) {
      return null;
    }

    const payload = JSON.parse(atob(payloadBase64));

    if (!payload.exp) {
      return null;
    }

    return payload.exp * 1000;
  } catch {
    return null;
  }
}

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
  useEffect(() => {
    if (!token) {
      return;
    }

    const expirationTime = getTokenExpirationTime(token);

    if (!expirationTime) {
      return;
    }

    const timeUntilExpiration = expirationTime - Date.now();

    if (timeUntilExpiration <= 0) {
      logout();
      window.location.href = "/login?expired=true";
      return;
    }

    const timeoutId = window.setTimeout(() => {
      logout();
      window.location.href = "/login?expired=true";
    }, timeUntilExpiration);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [token]);
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
