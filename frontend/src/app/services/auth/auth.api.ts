import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { LoginResponse, MeResponse } from '../../models/auth/auth.model';

/**
 * Creates a lightweight API wrapper for authentication endpoints.
 */
export const createAuthApi = (http: HttpClient) => {
  /**
   * Sends login credentials and returns the JWT token on success.
   */
  const login = (email: string, password: string) =>
    http.post<LoginResponse>(`${API_CONFIG.baseUrl}/api/users/login`, { email, password });

  /**
   * Registers a user with the backend.
   */
  const register = (email: string, password: string) =>
    http.post<void>(`${API_CONFIG.baseUrl}/api/users/register`, { email, password });

  /**
   * Loads the authenticated user's profile.
   */
  const getMe = () => http.get<MeResponse>(`${API_CONFIG.baseUrl}/api/users/me`);

  return {
    login,
    register,
    getMe,
  };
};
