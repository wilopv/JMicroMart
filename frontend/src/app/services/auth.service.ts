import { Injectable, computed, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';
import { AuthResponse, User } from '../models/auth.model';
import { createAuthApi } from './auth/auth.api';
import { extractHttpErrorMessage } from '../utils/http-errors';
import { mapMeToUser } from './auth/auth.mappers';
import { clearToken, readToken, writeToken } from './auth/auth.session';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = signal<string | null>(null);
  private currentUser = signal<User | null>(null);
  isAuthenticated = computed(() => this.token() !== null);
  user = this.currentUser.asReadonly();
  private authError = signal<string | null>(null);
  authErrorMessage = this.authError.asReadonly();
  private api: ReturnType<typeof createAuthApi>;

  constructor(private router: Router, private http: HttpClient) {
    this.api = createAuthApi(this.http);
    this.loadSessionFromStorage();
  }

  /**
   * Initiates a login request and hydrates the session on success.
   */
  login(email: string, password: string): AuthResponse {
    this.authError.set(null);

    this.api
      .login(email, password)
      .pipe(
        tap((response) => this.setToken(response.token)),
        switchMap(() => this.getMe())
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.handleAuthError(error);
        },
      });

    return { success: true, message: 'Login exitoso' };
  }

  /**
   * Registers a user and starts an authenticated session when successful.
   */
  register(userData: { name?: string; email: string; password: string; confirmPassword: string }): AuthResponse {
    this.authError.set(null);

    const registerPayload = {
      email: userData.email,
      password: userData.password,
    };

    this.api
      .register(registerPayload.email, registerPayload.password)
      .pipe(
        switchMap(() => this.api.login(userData.email, userData.password)),
        tap((response) => this.setToken(response.token)),
        switchMap(() => this.getMe())
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.handleAuthError(error);
        },
      });

    return { success: true, message: 'Registro exitoso' };
  }

  /**
   * Fetches the authenticated user's profile from the backend.
   */
  getMe() {
    return this.api.getMe().pipe(
      map((response) => mapMeToUser(response)),
      tap((user) => this.currentUser.set(user)),
      catchError((error) => throwError(() => error))
    );
  }

  /**
   * Clears the session state and returns the user to the home screen.
   */
  logout(): void {
    this.clearSession();
    this.router.navigate(['/']);
  }

  /**
   * Restores the persisted token and hydrates the user session when possible.
   */
  private loadSessionFromStorage(): void {
    const token = readToken();
    if (!token) {
      return;
    }

    this.token.set(token);
    this.getMe().subscribe({
      error: () => {
        this.clearSession();
      },
    });
  }

  /**
   * Persists the JWT token and updates the reactive auth state.
   */
  private setToken(token: string): void {
    this.token.set(token);
    writeToken(token);
  }

  /**
   * Clears stored credentials and local user state.
   */
  private clearSession(): void {
    this.token.set(null);
    this.currentUser.set(null);
    clearToken();
  }

  /**
   * Stores an auth error message without throwing in UI-specific ways.
   */
  private handleAuthError(error: unknown): void {
    this.authError.set(extractHttpErrorMessage(error));
    if (error instanceof HttpErrorResponse && error.status === 401) {
      this.clearSession();
    }
  }
}
