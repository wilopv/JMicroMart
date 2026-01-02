import { Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  isAuthenticated = computed(() => this.currentUser() !== null);
  user = this.currentUser.asReadonly();

  constructor(private router: Router) {
    this.loadFromLocalStorage();
  }

  login(email: string, password: string): AuthResponse {
    // Mock validation
    if (!email || !password) {
      return { success: false, message: 'Email y contraseña son requeridos' };
    }

    if (password.length < 4) {
      return { success: false, message: 'La contraseña debe tener al menos 4 caracteres' };
    }

    // Mock user
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email: email,
      createdAt: new Date(),
    };

    this.currentUser.set(user);
    this.saveToLocalStorage(user);
    this.router.navigate(['/products']);

    return { success: true, message: 'Login exitoso', user };
  }

  register(userData: { name: string; email: string; password: string; confirmPassword: string }): AuthResponse {
    // Mock validation
    if (!userData.name || !userData.email || !userData.password) {
      return { success: false, message: 'Todos los campos son requeridos' };
    }

    if (userData.password !== userData.confirmPassword) {
      return { success: false, message: 'Las contraseñas no coinciden' };
    }

    if (userData.password.length < 4) {
      return { success: false, message: 'La contraseña debe tener al menos 4 caracteres' };
    }

    // Mock user creation
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name,
      email: userData.email,
      createdAt: new Date(),
    };

    this.currentUser.set(user);
    this.saveToLocalStorage(user);
    this.router.navigate(['/products']);

    return { success: true, message: 'Registro exitoso', user };
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  private saveToLocalStorage(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private loadFromLocalStorage(): void {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        user.createdAt = new Date(user.createdAt);
        this.currentUser.set(user);
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
  }
}
