
export interface LoginData {
  email: string;
  password: string;
}

export interface AuthUser {
  user_id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
