import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="surface">
      <!-- Header -->
      <div class="border-b border-subtle surface-muted px-4 py-12 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h1 class="text-4xl font-bold text-strong">Mi Cuenta</h1>
          <p class="mt-2 text-muted">Gestiona tu cuenta</p>
        </div>
      </div>

      <!-- Content -->
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid gap-8 lg:grid-cols-3">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Profile Card -->
            <div class="card rounded-lg p-8">
              <h2 class="text-2xl font-bold text-strong">Información de Perfil</h2>

              <div class="mt-8 space-y-6">
                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium text-muted">Correo Electrónico</label>
                  <p class="mt-2 text-lg text-strong">{{ authService.user()?.email }}</p>
                </div>

                <!-- Account Created -->
                <div>
                  <label class="block text-sm font-medium text-muted">Cuenta Creada</label>
                  <p class="mt-2 text-lg text-strong">
                    {{ authService.user()?.createdAt | date: 'dd/MM/yyyy' }}
                  </p>
                </div>

                <!-- Divider -->
                <hr class="border-subtle" />

                <!-- Account Actions -->
                <div class="flex gap-4">
                  <a
                    routerLink="/orders"
                    class="btn btn-primary px-6 py-2 transition-all duration-200 hover:shadow-lg"
                  >
                    Ver Pedidos
                  </a>
                  <button
                    (click)="onLogout()"
                    class="btn btn-secondary px-6 py-2 transition-all duration-200"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Quick Links -->
            <div class="card rounded-lg p-6">
              <h3 class="font-bold text-strong">Enlaces Rápidos</h3>
              <ul class="mt-4 space-y-3">
                <li>
                  <a
                    routerLink="/orders"
                    class="btn-link text-sm font-medium"
                  >
                    Mis pedidos
                  </a>
                </li>
                <li>
                  <a routerLink="/favorites" class="btn-link text-sm font-medium">
                    Favoritos
                  </a>
                </li>
                <li>
                  <a routerLink="/addresses" class="btn-link text-sm font-medium">
                    Direcciones
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class MyAccountComponent {
  constructor(public authService: AuthService) {}

  onLogout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      this.authService.logout();
    }
  }
}
