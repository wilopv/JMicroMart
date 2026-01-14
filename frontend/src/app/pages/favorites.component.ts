import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../components/product-card.component';
import { ErrorSnackbarComponent } from '../components/error-snackbar.component';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent, ErrorSnackbarComponent],
  template: `
    <div class="surface">
      <!-- Header -->
      <div class="border-b border-subtle surface-muted px-4 py-12 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h1 class="text-4xl font-bold text-strong">Favoritos</h1>
          <p class="mt-2 text-muted">Productos guardados para más tarde</p>
        </div>
      </div>

      <!-- Content -->
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="mb-6">
          <app-error-snackbar *ngIf="favoritesService.errorMessage()" [message]="favoritesService.errorMessage()" />
        </div>

        <div *ngIf="favoritesService.loadingState()" class="text-sm text-muted">
          Cargando favoritos...
        </div>

        <div *ngIf="favoritesService.favoritesList().length > 0; else emptyFavorites">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <app-product-card
              *ngFor="let product of favoritesService.favoritesList()"
              [product]="product"
            />
          </div>
        </div>
      </div>
    </div>

    <ng-template #emptyFavorites>
      <div *ngIf="!favoritesService.loadingState()" class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="card rounded-lg surface-muted p-12 text-center shadow-none">
          <svg class="mx-auto h-12 w-12 icon-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A4.5 4.5 0 016.5 4c1.74 0 3.41.81 4.5 2.09A6.02 6.02 0 0115.5 4 4.5 4.5 0 0120 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z"
            />
          </svg>
          <h3 class="mt-4 text-lg font-semibold text-strong">No tienes favoritos</h3>
          <p class="mt-2 text-muted">Explora productos y guarda los que más te gusten</p>
          <a routerLink="/products" class="btn btn-secondary mt-6 px-6 py-3">
            Ver productos
          </a>
        </div>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class FavoritesComponent {
  constructor(public favoritesService: FavoritesService) {
    this.favoritesService.loadFavorites().subscribe({
      error: () => undefined,
    });
  }
}
