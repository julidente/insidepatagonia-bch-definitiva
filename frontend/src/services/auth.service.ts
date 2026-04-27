
import { apiClient } from "./apiClient";
import type { LoginData, AuthResponse } from "../types/auth";

export async function loginRequest(data: LoginData): Promise<AuthResponse> {
  return apiClient("auth/login", {
    method: "POST",
    body: JSON.stringify(data)
  });
}
