import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddressesService } from '../services/addresses.service';
import { Address, CreateAddressPayload } from '../models/user/address.model';
import { ErrorSnackbarComponent } from '../components/error-snackbar.component';
import { extractHttpErrorMessage } from '../utils/http-errors';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ErrorSnackbarComponent],
  template: `
    <div class="surface">
      <div class="border-b border-subtle surface-muted px-4 py-12 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h1 class="text-4xl font-bold text-strong">Direcciones</h1>
          <p class="mt-2 text-muted">Direcciones de entrega guardadas en tu cuenta</p>
        </div>
      </div>

      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="mb-6">
          <app-error-snackbar *ngIf="error()" [message]="error()" />
        </div>

        <section class="mb-10">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-strong">Agregar dirección</h2>
          </div>
          <form (ngSubmit)="submitAddress()" class="mt-6 grid gap-4 md:grid-cols-2">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-strong">Calle y número</label>
              <input
                type="text"
                [(ngModel)]="street"
                name="street"
                required
                class="input input-muted mt-2"
                placeholder="Av. Principal 123"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-strong">Ciudad</label>
              <input
                type="text"
                [(ngModel)]="city"
                name="city"
                required
                class="input input-muted mt-2"
                placeholder="Ciudad"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-strong">País</label>
              <input
                type="text"
                [(ngModel)]="country"
                name="country"
                required
                class="input input-muted mt-2"
                placeholder="País"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-strong">Código Postal</label>
              <input
                type="text"
                [(ngModel)]="postalCode"
                name="postalCode"
                required
                class="input input-muted mt-2"
                placeholder="00000"
              />
            </div>
            <div class="flex items-end">
              <button
                type="submit"
                [disabled]="loading()"
                class="btn btn-primary w-full py-3 transition-all duration-200 hover:shadow-lg"
              >
                {{ loading() ? 'Guardando...' : 'Guardar dirección' }}
              </button>
            </div>
          </form>
        </section>

        <section>
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-strong">Direcciones de entrega</h2>
          </div>
          <div class="mt-6 space-y-4">
            <div *ngFor="let address of deliveryAddresses()" class="card rounded-lg">
              <div class="flex items-start justify-between">
                <div>
                  <p class="text-sm font-semibold text-strong">Dirección</p>
                  <p class="text-sm text-muted">{{ address.street }}</p>
                </div>
              </div>
              <div class="mt-4 text-sm text-muted">
                <p>{{ address.city }}, {{ address.postalCode }}</p>
                <p>{{ address.country }}</p>
              </div>
            </div>
          </div>
        </section>

        <div class="mt-10">
          <a routerLink="/my-account" class="btn btn-secondary px-6 py-3">
            Volver a mi cuenta
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AddressesComponent {
  deliveryAddresses = signal<Address[]>([]);
  loading = signal(false);
  error = signal<string>('');
  street = '';
  city = '';
  country = '';
  postalCode = '';

  constructor(private addressesService: AddressesService) {
    this.loadAddresses();
  }

  // Loads addresses from the backend and updates local UI state.
  private loadAddresses(): void {
    this.loading.set(true);
    this.addressesService.getAddresses().subscribe({
      next: (addresses) => {
        this.deliveryAddresses.set(addresses);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(extractHttpErrorMessage(err));
        this.loading.set(false);
      },
    });
  }

  // Submits a new address to the backend and refreshes the list on success.
  submitAddress(): void {
    const payload: CreateAddressPayload = {
      street: this.street,
      city: this.city,
      country: this.country,
      postalCode: this.postalCode,
    };

    this.error.set('');
    this.loading.set(true);
    this.addressesService.createAddress(payload).subscribe({
      next: () => {
        this.street = '';
        this.city = '';
        this.country = '';
        this.postalCode = '';
        this.loadAddresses();
      },
      error: (err) => {
        this.error.set(extractHttpErrorMessage(err));
        this.loading.set(false);
      },
    });
  }
}
