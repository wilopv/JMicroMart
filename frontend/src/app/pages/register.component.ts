import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen surface-muted px-4 py-12 sm:px-6 lg:px-8 flex items-center justify-center">
      <div class="w-full max-w-md">
        <!-- Card -->
        <div class="card rounded-2xl px-8 py-12 shadow-lg border-0">
          <!-- Header -->
          <div class="text-center">
            <h1 class="text-3xl font-bold text-strong">Registrarse</h1>
            <p class="mt-2 text-muted">Crea tu cuenta en JMicroMart</p>
          </div>

          <!-- Error Message -->
          <div *ngIf="error()" class="mt-6 rounded-lg border border-subtle surface-muted p-4">
            <p class="text-sm text-muted">{{ error() }}</p>
          </div>

          <!-- Form -->
          <form (ngSubmit)="onSubmit()" class="mt-8 space-y-4">
            <!-- Name Input -->
            <div>
              <label class="block text-sm font-medium text-strong">Nombre Completo</label>
              <input
                type="text"
                [(ngModel)]="name"
                name="name"
                required
                class="input input-muted mt-2"
                placeholder="Tu nombre"
              />
            </div>

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

            <!-- Confirm Password Input -->
            <div>
              <label class="block text-sm font-medium text-strong">Confirmar Contraseña</label>
              <input
                type="password"
                [(ngModel)]="confirmPassword"
                name="confirmPassword"
                required
                class="input input-muted mt-2"
                placeholder="••••••••"
              />
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="loading()"
              class="btn btn-primary mt-6 w-full py-3 transition-all duration-200 hover:shadow-lg"
            >
              {{ loading() ? 'Procesando...' : 'Registrarse' }}
            </button>
          </form>

          <!-- Login Link -->
          <p class="mt-6 text-center text-sm text-muted">
            ¿Ya tienes cuenta?
            <a routerLink="/login" class="btn-link font-semibold">
              Inicia sesión aquí
            </a>
          </p>

          <!-- Test Info -->
          <div class="mt-8 rounded-lg border border-subtle surface-muted p-4">
            <p class="text-xs text-muted">
              <strong>Demo:</strong> Usa cualquier datos (contraseña mín. 4 caracteres)
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = signal<string>('');
  loading = signal(false);

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.error.set('');
    this.loading.set(true);

    // Simulate async operation
    setTimeout(() => {
      const result = this.authService.register({
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      });
      this.loading.set(false);

      if (!result.success) {
        this.error.set(result.message);
      }
    }, 500);
  }
}
