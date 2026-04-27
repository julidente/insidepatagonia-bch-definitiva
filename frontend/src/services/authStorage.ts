const STORAGE_KEY = import.meta.env.VITE_AUTH_STORAGE_KEY || "admin_token";

export function setStoredToken(token: string) {
  window.localStorage.setItem(STORAGE_KEY, token);
}

export function getStoredToken(): string | null {
  return window.localStorage.getItem(STORAGE_KEY);
}

export function clearStoredToken() {
  window.localStorage.removeItem(STORAGE_KEY);
}
