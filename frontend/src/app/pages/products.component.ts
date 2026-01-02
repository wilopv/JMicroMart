import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent, Product } from '../components/product-card.component';
import { SearchBarComponent } from '../components/search-bar.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, SearchBarComponent],
  template: `
    <div class="surface">
      <!-- Header -->
      <div class="border-b border-subtle surface-muted px-4 py-12 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h1 class="text-4xl font-bold text-strong">Catálogo de Productos</h1>
          <p class="mt-2 text-muted">Explora nuestra colección completa de productos premium</p>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="border-b border-subtle surface px-4 py-6 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <app-search-bar placeholder="Buscar en productos..." buttonText="Buscar" />
        </div>
      </div>

      <!-- Main Content -->
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid gap-12 lg:grid-cols-4">
          <!-- Sidebar Filters -->
          <div class="lg:col-span-1">
            <div class="sticky top-24 space-y-8">
              <!-- Categories Filter -->
              <div>
                <h3 class="text-lg font-semibold text-strong">Categorías</h3>
                <div class="mt-4 space-y-3">
                  <label *ngFor="let category of categories" class="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      [checked]="selectedCategories().includes(category)"
                      (change)="toggleCategory(category)"
                      class="h-4 w-4 rounded control-brand"
                    />
                    <span class="ml-3 text-sm text-muted">{{ category }}</span>
                  </label>
                </div>
              </div>

              <!-- Price Filter -->
              <div>
                <h3 class="text-lg font-semibold text-strong">Rango de Precio</h3>
                <div class="mt-4 space-y-3">
                  <label *ngFor="let range of priceRanges" class="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      [checked]="selectedPrice() === range.label"
                      (change)="setPrice(range.label)"
                      name="price"
                      class="h-4 w-4 control-brand"
                    />
                    <span class="ml-3 text-sm text-muted">{{ range.label }}</span>
                  </label>
                </div>
              </div>

              <!-- Sort By -->
              <div>
                <h3 class="text-lg font-semibold text-strong">Ordenar Por</h3>
                <select
                  (change)="setSortBy($event)"
                  class="input mt-4"
                >
                  <option value="featured">Destacados</option>
                  <option value="newest">Más Nuevos</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="rating">Más Calificados</option>
                </select>
              </div>

              <!-- Reset Filters -->
              <button
                (click)="resetFilters()"
                class="btn btn-ghost w-full text-sm"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="lg:col-span-3">
            <!-- Results Count -->
            <div class="mb-6 flex items-center justify-between">
              <p class="text-sm text-muted">
                Mostrando <span class="font-semibold text-strong">{{ filteredProducts().length }}</span> productos
              </p>
            </div>

            <!-- Products Grid -->
            <div *ngIf="filteredProducts().length > 0; else noProducts" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <app-product-card *ngFor="let product of filteredProducts()" [product]="product" />
            </div>

            <!-- No Products Message -->
            <ng-template #noProducts>
              <div class="card rounded-lg surface-muted p-12 text-center shadow-none">
                <svg class="mx-auto h-12 w-12 icon-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 class="mt-4 text-lg font-semibold text-strong">No hay productos</h3>
                <p class="mt-2 text-muted">Intenta ajustar tus filtros</p>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ProductsComponent {
  selectedCategories = signal<string[]>([]);
  selectedPrice = signal<string>('');
  sortBy = signal<string>('featured');
  searchTerm = signal<string>('');

  constructor(private route: ActivatedRoute) {
    effect(() => {
      this.route.queryParams.subscribe((params) => {
        const q = params['q'] || '';
        this.searchTerm.set(q);
      });
    });
  }

  categories = ['Electrónica', 'Wearables', 'Accesorios', 'Moda'];

  priceRanges = [
    { label: 'Menos de $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: 'Más de $200', min: 200, max: Infinity },
  ];

  allProducts: Product[] = [
    {
      id: 1,
      name: 'Auriculares Inalámbricos Premium',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      rating: 5,
      reviews: 328,
      category: 'Electrónica',
    },
    {
      id: 2,
      name: 'Reloj Inteligente Pro',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      rating: 4,
      reviews: 256,
      category: 'Wearables',
    },
    {
      id: 3,
      name: 'Mochila Minimalista',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      rating: 5,
      reviews: 412,
      category: 'Accesorios',
    },
    {
      id: 4,
      name: 'Cámara Web Ultra HD',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
      rating: 4,
      reviews: 189,
      category: 'Electrónica',
    },
    {
      id: 5,
      name: 'Almohadilla de Carga Inalámbrica',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1591290621738-e3bde4a893a4?w=500&h=500&fit=crop',
      rating: 4,
      reviews: 142,
      category: 'Accesorios',
    },
    {
      id: 6,
      name: 'Correa de Reloj Cuero Premium',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop',
      rating: 5,
      reviews: 267,
      category: 'Wearables',
    },
    {
      id: 7,
      name: 'SSD Portátil 1TB',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
      rating: 4,
      reviews: 201,
      category: 'Electrónica',
    },
    {
      id: 8,
      name: 'Gafas de Sol Elegantes',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
      rating: 5,
      reviews: 389,
      category: 'Moda',
    },
    {
      id: 9,
      name: 'Lámpara de Escritorio Premium',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=500&fit=crop',
      rating: 4,
      reviews: 124,
      category: 'Accesorios',
    },
    {
      id: 10,
      name: 'Correa de Rastreador de Fitness',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1575311373937-040b3e6f47b7?w=500&h=500&fit=crop',
      rating: 5,
      reviews: 456,
      category: 'Wearables',
    },
    {
      id: 11,
      name: 'Camiseta de Algodón Premium',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      rating: 4,
      reviews: 234,
      category: 'Moda',
    },
    {
      id: 12,
      name: 'Micrófono Profesional',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1590479773036-5f50e2e7a804?w=500&h=500&fit=crop',
      rating: 5,
      reviews: 178,
      category: 'Electrónica',
    },
  ];

  filteredProducts = () => {
    let products = this.allProducts;

    // Filter by search term
    const search = this.searchTerm().toLowerCase();
    if (search) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
      );
    }

    // Filter by category
    const selected = this.selectedCategories();
    if (selected.length > 0) {
      products = products.filter((p) => selected.includes(p.category));
    }

    // Filter by price
    const priceLabel = this.selectedPrice();
    if (priceLabel) {
      const range = this.priceRanges.find((r) => r.label === priceLabel);
      if (range) {
        products = products.filter((p) => p.price >= range.min && p.price <= range.max);
      }
    }

    // Sort
    const sortKey = this.sortBy();
    switch (sortKey) {
      case 'newest':
        products = [...products].reverse();
        break;
      case 'price-low':
        products = [...products].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products = [...products].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products = [...products].sort((a, b) => b.rating - a.rating);
        break;
    }

    return products;
  };

  toggleCategory(category: string) {
    const current = this.selectedCategories();
    const updated = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category];
    this.selectedCategories.set(updated);
  }

  setPrice(label: string) {
    this.selectedPrice.set(this.selectedPrice() === label ? '' : label);
  }

  setSortBy(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.sortBy.set(value);
  }

  resetFilters() {
    this.selectedCategories.set([]);
    this.selectedPrice.set('');
    this.sortBy.set('featured');
  }
}
