import { getStoredToken, clearStoredToken } from "./authStorage";

const API_URL = import.meta.env.VITE_API_URL;

export async function apiClient(endpoint: string, options: RequestInit = {}) {
  const token = getStoredToken();

  const headers = new Headers(options.headers || {});
  const isFormData = options.body instanceof FormData;

  if (!isFormData) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers
  });

  if (response.status === 401 || response.status === 403) {
    clearStoredToken();

    if (!window.location.pathname.includes("/login")) {
      window.location.href = "/login?expired=true";
    }

    throw new Error("Tu sesión expiró. Iniciá sesión nuevamente.");
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error en la API");
  }

  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return null;
}