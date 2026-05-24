const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

export function getImageUrl(url?: string | null): string {
  if (!url) return "";

  if (url.startsWith("/uploads/")) {
    return `${API_ORIGIN}${url}`;
  }

  return url;
}