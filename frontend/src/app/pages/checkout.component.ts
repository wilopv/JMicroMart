import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="surface">
      <!-- Header -->
      <div class="border-b border-subtle surface-muted px-4 py-12 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h1 class="text-4xl font-bold text-strong">Pago</h1>
        </div>
      </div>

      <!-- Checkout Content -->
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid gap-12 lg:grid-cols-3">
          <!-- Checkout Form -->
          <div class="lg:col-span-2">
            <!-- Shipping Section -->
            <div class="card rounded-lg shadow-none">
              <h2 class="text-2xl font-bold text-strong">Información de Envío</h2>
              <form class="mt-6 space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-strong">Nombre</label>
                    <input type="text" class="input mt-1" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-strong">Apellido</label>
                    <input type="text" class="input mt-1" />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-strong">Correo Electrónico</label>
                  <input type="email" class="input mt-1" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-strong">Dirección</label>
                  <input type="text" class="input mt-1" />
                </div>
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-strong">Ciudad</label>
                    <input type="text" class="input mt-1" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-strong">Estado</label>
                    <input type="text" class="input mt-1" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-strong">Código Postal</label>
                    <input type="text" class="input mt-1" />
                  </div>
                </div>
              </form>
            </div>

            <!-- Payment Section -->
            <div class="card rounded-lg shadow-none mt-8">
              <h2 class="text-2xl font-bold text-strong">Método de Pago</h2>
              <form class="mt-6 space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <label class="option-card flex cursor-pointer items-center gap-3">
                    <input type="radio" name="payment" checked class="h-4 w-4" />
                    <span class="font-medium text-strong">Tarjeta de Crédito</span>
                  </label>
                  <label class="option-card flex cursor-pointer items-center gap-3">
                    <input type="radio" name="payment" class="h-4 w-4" />
                    <span class="font-medium text-strong">PayPal</span>
                  </label>
                </div>

                <div>
                  <label class="block text-sm font-medium text-strong">Número de Tarjeta</label>
                  <input type="text" placeholder="1234 5678 9012 3456" class="input mt-1" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-strong">Fecha de Vencimiento</label>
                    <input type="text" placeholder="MM/AA" class="input mt-1" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-strong">CVV</label>
                    <input type="text" placeholder="123" class="input mt-1" />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="card rounded-lg surface-muted shadow-none h-fit sticky top-24">
            <h2 class="text-2xl font-bold text-strong">Resumen de Orden</h2>

            <!-- Items -->
            <div class="mt-6 space-y-4 border-b border-subtle pb-6 max-h-64 overflow-y-auto">
              <div *ngFor="let item of cartService.cart()" class="flex justify-between text-sm">
                <p class="text-muted">
                  {{ item.name }} <span class="text-subtle">x{{ item.quantity }}</span>
                </p>
                <p class="font-semibold text-strong">
                  <span>&#36;</span>{{ (item.price * item.quantity).toFixed(2) }}
                </p>
              </div>
            </div>

            <!-- Totals -->
            <div class="mt-6 space-y-4 border-b border-subtle pb-6">
              <div class="flex justify-between">
                <p class="text-muted">Subtotal</p>
                <p class="font-semibold text-strong">
                  <span>&#36;</span>{{ cartService.totalPrice().toFixed(2) }}
                </p>
              </div>
              <div class="flex justify-between">
                <p class="text-muted">Envío</p>
                <p class="font-semibold text-strong">Gratis</p>
              </div>
              <div class="flex justify-between">
                <p class="text-muted">Impuesto (8%)</p>
                <p class="font-semibold text-strong">
                  <span>&#36;</span>{{ (cartService.totalPrice() * 0.08).toFixed(2) }}
                </p>
              </div>
            </div>

            <!-- Total -->
            <div class="mt-6 flex justify-between">
              <p class="text-xl font-bold text-strong">Total</p>
              <p class="text-xl font-bold text-brand">
                <span>&#36;</span>{{ (cartService.totalPrice() * 1.08).toFixed(2) }}
              </p>
            </div>

            <!-- Place Order Button -->
            <button
              (click)="placeOrder()"
              [disabled]="cartService.totalItems() === 0"
              [class.opacity-50]="cartService.totalItems() === 0"
              [class.cursor-not-allowed]="cartService.totalItems() === 0"
              class="btn btn-primary mt-8 w-full py-3 transition-all duration-200 hover:shadow-lg"
            >
              Realizar Orden
            </button>

            <!-- Back to Cart -->
            <a
              routerLink="/cart"
              class="btn-link mt-4 block text-center text-sm font-medium"
            >
              Volver al Carrito
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class CheckoutComponent {
  constructor(public cartService: CartService) {}

  placeOrder() {
    if (this.cartService.totalItems() > 0) {
      alert('¡Orden realizada exitosamente! Gracias por tu compra.');
      this.cartService.clearCart();
    }
  }
}
