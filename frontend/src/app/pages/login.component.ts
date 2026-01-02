import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen surface-muted px-4 py-12 sm:px-6 lg:px-8 flex items-center justify-center">
      <div class="w-full max-w-md">
        <!-- Card -->
        <div class="card rounded-2xl px-8 py-12 shadow-lg border-0">
          <!-- Header -->
          <div class="text-center">
            <h1 class="text-3xl font-bold text-strong">Iniciar Sesión</h1>
            <p class="mt-2 text-muted">Bienvenido a JMicroMart</p>
          </div>

          <!-- Error Message -->
          <div *ngIf="error()" class="mt-6 rounded-lg border border-subtle surface-muted p-4">
            <p class="text-sm text-muted">{{ error() }}</p>
          </div>

          <!-- Form -->
          <form (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
            <!-- Email Input -->
            <div>
              <label class="block text-sm font-medium text-strong">Correo Electrónico</label>
              <input
                type="email"
                [(ngModel)]="email"
                name="email"
                required
                class="input input-muted mt-2"
                placeholder="tu@email.com"
              />
            </div>

            <!-- Password Input -->
            <div>
              <label class="block text-sm font-medium text-strong">Contraseña</label>
              <input
                type="password"
                [(ngModel)]="password"
                name="password"
                required
                class="input input-muted mt-2"
                placeholder="••••••••"
              />
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="loading()"
              class="btn btn-primary w-full py-3 transition-all duration-200 hover:shadow-lg"
            >
              {{ loading() ? 'Procesando...' : 'Iniciar Sesión' }}
            </button>
          </form>

          <!-- Register Link -->
          <p class="mt-6 text-center text-sm text-muted">
            ¿No tienes cuenta?
            <a routerLink="/register" class="btn-link font-semibold">
              Regístrate aquí
            </a>
          </p>

          <!-- Test Credentials Info -->
          <div class="mt-8 rounded-lg border border-subtle surface-muted p-4">
            <p class="text-xs text-muted">
              <strong>Demo:</strong> Usa cualquier email y contraseña (mín. 4 caracteres)
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginComponent {
  email = '';
  password = '';
  error = signal<string>('');
  loading = signal(false);

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.error.set('');
    this.loading.set(true);

    // Simulate async operation
    setTimeout(() => {
      const result = this.authService.login(this.email, this.password);
      this.loading.set(false);

      if (!result.success) {
        this.error.set(result.message);
      }
    }, 500);
  }
}
