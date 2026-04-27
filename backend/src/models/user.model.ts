// src/models/user.model.ts

export interface IUser {
  user_id: number;
  name: string;
  email: string;
  password_hash: string;
}
