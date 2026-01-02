import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AddressesService, Address } from '../services/addresses.service';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="surface">
      <div class="border-b border-subtle surface-muted px-4 py-12 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h1 class="text-4xl font-bold text-strong">Direcciones</h1>
          <p class="mt-2 text-muted">Direcciones de entrega guardadas en tu cuenta</p>
        </div>
      </div>

      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section>
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-strong">Direcciones de entrega</h2>
          </div>
          <div class="mt-6 space-y-4">
            <div *ngFor="let address of deliveryAddresses" class="card rounded-lg">
              <div class="flex items-start justify-between">
                <div>
                  <p class="text-sm font-semibold text-strong">{{ address.label }}</p>
                  <p class="text-sm text-muted">{{ address.recipient }}</p>
                </div>
                <div class="flex items-center gap-3">
                  <span *ngIf="address.isDefault" class="status-pill rounded-full px-3 py-1 text-xs font-semibold">
                    Predeterminada
                  </span>
                  <button
                    type="button"
                    class="btn btn-ghost-muted px-3 py-1 text-xs"
                    (click)="deleteAddress(address.id)"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              <div class="mt-4 text-sm text-muted">
                <p>{{ address.line1 }}</p>
                <p *ngIf="address.line2">{{ address.line2 }}</p>
                <p>{{ address.city }}, {{ address.region }} {{ address.postalCode }}</p>
                <p>{{ address.country }}</p>
                <p class="mt-2">{{ address.phone }}</p>
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
  deliveryAddresses: Address[] = [];

  constructor(
    private authService: AuthService,
    private addressesService: AddressesService
  ) {
    this.deliveryAddresses = this.loadAddresses();
  }

  deleteAddress(addressId: string) {
    const user = this.authService.user();
    if (!user) {
      return;
    }
    this.deliveryAddresses = this.addressesService.deleteAddress(user.id, addressId);
  }

  private loadAddresses(): Address[] {
    const user = this.authService.user();
    if (!user) {
      return [];
    }
    return this.addressesService.getAddressesForUser(user.id);
  }
}
