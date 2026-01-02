import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="surface">
      <!-- Header -->
      <div class="border-b border-subtle surface-muted px-4 py-12 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h1 class="text-4xl font-bold text-strong">Carrito de Compras</h1>
        </div>
      </div>

      <!-- Cart Content -->
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div *ngIf="cartService.cart().length > 0; else emptyCart" class="grid gap-12 lg:grid-cols-3">
          <!-- Cart Items -->
          <div class="lg:col-span-2">
            <div class="space-y-4">
              <div *ngFor="let item of cartService.cart()" class="card card-interactive rounded-lg p-4 shadow-none flex gap-4">
                <!-- Product Image -->
                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg surface-soft">
                  <img [src]="item.image" [alt]="item.name" class="h-full w-full object-cover" />
                </div>

                <!-- Product Details -->
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-strong">{{ item.name }}</h3>
                  <p class="mt-1 text-muted">
                    <span>&#36;</span>{{ item.price.toFixed(2) }} cada uno
                  </p>

                  <!-- Quantity Controls -->
                  <div class="mt-4 flex items-center gap-4">
                    <div class="flex items-center gap-2">
                      <button
                        (click)="decreaseQuantity(item.id)"
                        class="btn btn-ghost-muted px-3 py-1 font-normal"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        [(ngModel)]="item.quantity"
                        (change)="updateQuantity(item.id, item.quantity)"
                        class="w-12 rounded-lg px-2 py-1 text-center control-border focus:outline-none focus-brand"
                      />
                      <button
                        (click)="increaseQuantity(item.id)"
                        class="btn btn-ghost-muted px-3 py-1 font-normal"
                      >
                        +
                      </button>
                    </div>

                    <!-- Remove Button -->
                    <button
                      (click)="cartService.removeFromCart(item.id)"
                      class="btn-link ml-auto text-sm font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                <!-- Item Total -->
                <div class="flex flex-col items-end justify-between">
                  <p class="text-2xl font-bold text-strong">
                    <span>&#36;</span>{{ (item.price * item.quantity).toFixed(2) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Continue Shopping -->
            <div class="mt-8">
              <a
                routerLink="/products"
                class="btn-link inline-flex items-center gap-2"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Continuar Comprando
              </a>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="card rounded-lg surface-muted p-6 shadow-none h-fit sticky top-24">
            <h2 class="text-2xl font-bold text-strong">Resumen de Orden</h2>

            <!-- Items -->
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
                <p class="text-muted">Impuesto</p>
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

            <!-- Checkout Button -->
            <a
              routerLink="/checkout"
              class="btn btn-primary mt-8 w-full py-3 transition-all duration-200 hover:shadow-lg"
            >
              Proceder a Pagar
            </a>

            <!-- Security Info -->
            <div class="mt-6 flex items-center gap-2 rounded-lg surface-soft p-4">
              <svg class="h-5 w-5 icon-brand" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
              <p class="text-xs text-muted">Tu pago es seguro y está encriptado</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty Cart Message -->
    <ng-template #emptyCart>
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="card rounded-lg surface-muted p-12 text-center shadow-none">
          <svg class="mx-auto h-16 w-16 icon-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 class="mt-4 text-2xl font-bold text-strong">Tu carrito está vacío</h2>
          <p class="mt-2 text-muted">Empieza a comprar para agregar artículos a tu carrito</p>
          <a
            routerLink="/products"
            class="btn btn-primary mt-8 px-8 py-3 transition-all duration-200 hover:shadow-lg"
          >
            Comprar Ahora
          </a>
        </div>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class CartComponent {
  constructor(public cartService: CartService) {}

  increaseQuantity(productId: number) {
    const item = this.cartService.cart().find((i) => i.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + 1);
    }
  }

  decreaseQuantity(productId: number) {
    const item = this.cartService.cart().find((i) => i.id === productId);
    if (item && item.quantity > 1) {
      this.cartService.updateQuantity(productId, item.quantity - 1);
    }
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }
}
