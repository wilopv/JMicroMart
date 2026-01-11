export interface User {
  id: string;
  name?: string;
  email: string;
  createdAt?: Date;
}

export interface LoginResponse {
  token: string;
}

export interface MeResponse {
  id: string;
  name?: string;
  email: string;
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}
