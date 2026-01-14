import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { OrdersService } from '../services/orders.service';
import { AddressesService } from '../services/addresses.service';
import { ErrorSnackbarComponent } from '../components/error-snackbar.component';
import { Address } from '../models/user/address.model';
import { CreateOrderRequest } from '../models/order/order.model';
import { extractHttpErrorMessage } from '../utils/http-errors';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ErrorSnackbarComponent],
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
        <div class="mb-6">
          <app-error-snackbar *ngIf="errorMessage()" [message]="errorMessage()" />
        </div>

        <div class="grid gap-12 lg:grid-cols-3">
          <!-- Checkout Form -->
          <div class="lg:col-span-2">
            <!-- Shipping Section -->
            <div class="card rounded-lg shadow-none">
              <h2 class="text-2xl font-bold text-strong">Información de Envío</h2>
              <form class="mt-6 space-y-4">
                <div *ngIf="savedAddresses().length > 0">
                  <label for="saved-address" class="block text-sm font-medium text-strong">
                    Direcciones guardadas
                  </label>
                  <select
                    id="saved-address"
                    name="savedAddress"
                    class="input mt-2"
                    [ngModel]="selectedAddressIndex()"
                    (ngModelChange)="selectAddress($event)"
                  >
                    <option [ngValue]="null">Selecciona una direccion guardada</option>
                    <option *ngFor="let address of savedAddresses(); index as i" [ngValue]="i">
                      {{ address.street }} - {{ address.city }}
                    </option>
                  </select>
                </div>

                <div>
                  <label for="street" class="block text-sm font-medium text-strong">Calle y numero</label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    class="input mt-1"
                    placeholder="Av. Principal 123"
                    [(ngModel)]="street"
                  />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-strong">Nombre</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      class="input mt-1"
                      placeholder="Nombre"
                      [(ngModel)]="firstName"
                    />
                  </div>
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-strong">Apellidos</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      class="input mt-1"
                      placeholder="Apellidos"
                      [(ngModel)]="lastName"
                    />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="city" class="block text-sm font-medium text-strong">Ciudad</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      class="input mt-1"
                      placeholder="Ciudad"
                      [(ngModel)]="city"
                    />
                  </div>
                  <div>
                    <label for="country" class="block text-sm font-medium text-strong">Pais</label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      class="input mt-1"
                      placeholder="Pais"
                      [(ngModel)]="country"
                    />
                  </div>
                </div>
                <div>
                  <label for="postalCode" class="block text-sm font-medium text-strong">Codigo Postal</label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    class="input mt-1"
                    placeholder="00000"
                    [(ngModel)]="postalCode"
                  />
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
              [disabled]="cartService.totalItems() === 0 || loading()"
              [class.opacity-50]="cartService.totalItems() === 0 || loading()"
              [class.cursor-not-allowed]="cartService.totalItems() === 0 || loading()"
              class="btn btn-primary mt-8 w-full py-3 transition-all duration-200 hover:shadow-lg"
            >
              {{ loading() ? 'Procesando...' : 'Realizar Orden' }}
            </button>

            <p *ngIf="success()" class="mt-4 text-sm font-medium text-emerald-600">
              {{ success() }}
            </p>

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
  loading = signal(false);
  error = signal('');
  success = signal('');
  savedAddresses = signal<Address[]>([]);
  selectedAddressIndex = signal<number | null>(null);
  addressError = signal('');
  firstName = '';
  lastName = '';
  street = '';
  city = '';
  country = '';
  postalCode = '';

  constructor(
    public cartService: CartService,
    private ordersService: OrdersService,
    private addressesService: AddressesService
  ) {
    this.loadAddresses();
  }

  errorMessage(): string {
    return this.addressError() || this.error();
  }

  selectAddress(index: number | null): void {
    this.selectedAddressIndex.set(index);
    if (index === null || index === undefined) {
      return;
    }
    const address = this.savedAddresses()[index];
    if (!address) {
      return;
    }
    this.applyAddress(address);
  }

  private loadAddresses(): void {
    this.addressError.set('');

    this.addressesService.getAddresses().subscribe({
      next: (addresses) => {
        this.savedAddresses.set(addresses);
      },
      error: (err) => {
        this.addressError.set(extractHttpErrorMessage(err));
      },
    });
  }

  private applyAddress(address: Address): void {
    this.street = address.street;
    this.city = address.city;
    this.country = address.country;
    this.postalCode = address.postalCode;
  }

  placeOrder() {
    if (this.cartService.totalItems() === 0 || this.loading()) {
      return;
    }

    const payload: CreateOrderRequest = {
      items: this.cartService.cart().map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    this.error.set('');
    this.success.set('');
    this.loading.set(true);

    this.ordersService.createOrder(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set('Orden realizada exitosamente.');
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(extractHttpErrorMessage(err));
      },
    });
  }
}
