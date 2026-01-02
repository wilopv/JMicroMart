import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-50 w-full border-b border-strong surface-strong shadow-sm">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <!-- Logo -->
        <a routerLink="/" class="flex items-center gap-2">
          <div class="brand-mark flex h-10 w-10 items-center justify-center rounded-lg">
            <svg class="h-6 w-6 text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span class="text-xl font-bold text-inverse">JMicroMart</span>
        </a>

        <!-- Navigation -->
        <nav class="hidden gap-8 md:flex">
          <a routerLink="/" routerLinkActive="nav-link-active-inverse" [routerLinkActiveOptions]="{ exact: true }" class="nav-link-inverse">
            Inicio
          </a>
          <a routerLink="/products" routerLinkActive="nav-link-active-inverse" class="nav-link-inverse">
            Productos
          </a>
          <!-- User Account Link -->
          <a routerLink="/my-account" routerLinkActive="nav-link-active-inverse" class="nav-link-inverse">
            Mi Cuenta
          </a>
        </nav>

        <!-- Icons -->
        <div class="flex items-center gap-4">
          <!-- Cart Icon -->
          <a routerLink="/cart" class="relative">
            <div class="relative">
              <svg class="h-6 w-6 icon-link-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span *ngIf="cartService.totalItems() > 0" class="badge-brand absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold">
                {{ cartService.totalItems() }}
              </span>
            </div>
          </a>
        </div>
      </div>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  constructor(public cartService: CartService, public authService: AuthService) {}
}
