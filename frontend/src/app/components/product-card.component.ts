import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { FavoritesService } from '../services/favorites.service';
import { Product } from '../models/product/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-product group flex h-full flex-col overflow-hidden rounded-xl">
      <!-- Image Container -->
      <div class="relative h-64 overflow-hidden surface-soft">
        <button
          type="button"
          class="favorite-toggle absolute left-4 top-4 z-10 pointer-events-auto"
          [class.favorite-toggle-active]="favoritesService.isFavorite(product.id)"
          [class.favorite-toggle-disabled]="!favoritesService.isAuthenticated"
          [disabled]="!favoritesService.isAuthenticated"
          [attr.aria-pressed]="favoritesService.isFavorite(product.id)"
          [attr.aria-label]="favoritesService.isAuthenticated
            ? (favoritesService.isFavorite(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos')
            : 'Inicia sesión para guardar en favoritos'"
          (click)="toggleFavorite($event)"
        >
          <svg
            class="h-5 w-5"
            viewBox="0 0 24 24"
            stroke="currentColor"
            [attr.fill]="favoritesService.isFavorite(product.id) ? 'currentColor' : 'none'"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 17.27l-6.18 3.73 1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.63 7.19.61-5.46 4.73 1.64 7.03L12 17.27z" />
          </svg>
        </button>
        <img
          [src]="product.image"
          [alt]="product.name"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none"
        />
        <div class="badge-brand absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold">
          Oferta
        </div>
      </div>

      <!-- Content -->
      <div class="flex flex-1 flex-col p-4">
        <!-- Category -->
        <p class="text-xs font-medium text-subtle uppercase tracking-wide truncate">{{ product.category }}</p>

        <!-- Name -->
        <h3 class="mt-2 text-lg font-semibold text-strong truncate">{{ product.name }}</h3>

        <!-- Rating -->
        <div class="mt-2 flex items-center gap-1">
          <div class="flex gap-0.5">
            <span *ngFor="let i of [1,2,3,4,5]" [class.rating-star-active]="i <= product.rating" class="rating-star">
              ★
            </span>
          </div>
          <span class="text-xs text-muted">({{ product.reviews }} reviews)</span>
        </div>

        <!-- Price -->
        <div class="mt-3 flex items-center gap-2">
          <span class="text-2xl font-bold text-strong">
            <span>&#36;</span>{{ formatPrice(product.price) }}
          </span>
          <span class="text-sm font-medium text-subtle line-through">
            <span>&#36;</span>{{ discountedPrice }}
          </span>
        </div>

        <!-- Add to Cart Button -->
        <button
          (click)="addToCart()"
          class="btn btn-primary mt-6 w-full py-2.5 transition-all duration-200 hover:shadow-lg active:scale-95 mt-auto"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class ProductCardComponent {
  @Input() product!: Product;

  get discountedPrice() {
    return (this.product.price * 1.2).toFixed(2);
  }

  formatPrice(price: number) {
    return price.toFixed(2);
  }

  constructor(
    private cartService: CartService,
    public favoritesService: FavoritesService
  ) {}

  addToCart() {
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.image,
    });
  }

  toggleFavorite(event: MouseEvent) {
    event.stopPropagation();
    this.favoritesService.toggleFavorite(this.product);
  }
}
