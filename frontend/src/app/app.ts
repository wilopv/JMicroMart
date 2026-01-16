import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';
import { SnackbarComponent } from './components/snackbar.component';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, SnackbarComponent],
  template: `
    <div class="flex min-h-screen flex-col">
      <app-header />
      <main class="flex-1">
        <router-outlet />
      </main>
      <app-snackbar />
      <app-footer />
    </div>
    <div
      *ngIf="showAddToCartToast"
      class="pointer-events-none fixed left-1/2 top-20 z-50 flex w-[min(90vw,22rem)] -translate-x-1/2 items-center gap-2 rounded-lg border border-subtle surface px-4 py-3 text-sm font-semibold text-strong shadow-md"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <svg class="h-4 w-4 text-teal-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fill-rule="evenodd"
          d="M16.704 5.29a1 1 0 0 1 .006 1.415l-7.25 7.31a1 1 0 0 1-1.416.004L3.3 9.272a1 1 0 0 1 1.414-1.415l3.083 3.083 6.543-6.59a1 1 0 0 1 1.414-.06z"
          clip-rule="evenodd"
        />
      </svg>
      Agregado al carrito
    </div>
  `,
  styleUrl: './app.css'
})
export class App {
  showAddToCartToast = false;
  private toastTimeoutId?: ReturnType<typeof setTimeout>;

  constructor(private cartService: CartService) {
    effect(() => {
      const trigger = this.cartService.addToCartToast();
      if (!trigger) {
        return;
      }

      this.showAddToCartToast = true;

      if (this.toastTimeoutId) {
        clearTimeout(this.toastTimeoutId);
      }

      this.toastTimeoutId = setTimeout(() => {
        this.showAddToCartToast = false;
        this.toastTimeoutId = undefined;
      }, 2000);
    });
  }
}
