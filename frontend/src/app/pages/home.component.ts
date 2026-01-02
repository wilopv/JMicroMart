import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCardComponent, Product } from '../components/product-card.component';
import { SearchBarComponent } from '../components/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent, SearchBarComponent],
  template: `
    <!-- Hero Section -->
    <section class="hero-background relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8" style="--hero-image: url('https://images.unsplash.com/photo-1561715276-a2d087060f1d?q=80&w=1170&auto=format&fit=crop');">
      <div class="mx-auto max-w-7xl">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <!-- Left Content -->
          <div class="text-inverse">
            <h1 class="text-5xl font-bold tracking-tight sm:text-6xl text-inverse">
              Descubre Productos Increíbles
            </h1>
            <p class="mt-6 text-xl text-inverse-muted">
              Compra las últimas tendencias y artículos más vendidos. Desde moda hasta electrónica, encuentra todo lo que necesitas en un solo lugar.
            </p>
            <div class="mt-8">
              <app-search-bar placeholder="¿Qué estás buscando?" buttonText="Buscar" />
            </div>
          </div>

          <!-- Right Content - Empty for layout balance -->
          <div class="hidden lg:block"></div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="border-b border-subtle surface px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <!-- Feature 1 -->
          <div class="text-center">
            <div class="icon-chip mx-auto flex h-16 w-16 items-center justify-center rounded-full">
              <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-strong">Envío Gratis</h3>
            <p class="mt-2 text-sm text-muted">En órdenes mayores a $50. Entrega rápida y confiable a tu domicilio.</p>
          </div>

          <!-- Feature 2 -->
          <div class="text-center">
            <div class="icon-chip mx-auto flex h-16 w-16 items-center justify-center rounded-full">
              <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-strong">Pago Seguro</h3>
            <p class="mt-2 text-sm text-muted">Tu información de pago está encriptada y segura en todo momento.</p>
          </div>

          <!-- Feature 3 -->
          <div class="text-center">
            <div class="icon-chip mx-auto flex h-16 w-16 items-center justify-center rounded-full">
              <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-strong">Devoluciones Fáciles</h3>
            <p class="mt-2 text-sm text-muted">Política de devolución de 30 días. Sin preguntas si no estás satisfecho.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section id="featured" class="surface-muted px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <!-- Section Header -->
        <div class="text-center">
          <h2 class="text-4xl font-bold text-strong">Productos Destacados</h2>
          <p class="mt-4 text-lg text-muted">
            Selección curada de nuestros artículos más vendidos y en tendencia
          </p>
        </div>

        <!-- Products Grid -->
        <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <app-product-card *ngFor="let product of featuredProducts" [product]="product" />
        </div>

        <!-- View All Button -->
        <div class="mt-12 text-center">
          <a
            routerLink="/products"
            class="btn btn-secondary px-8 py-3 transition-all duration-200"
          >
            Ver Todos los Productos
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class HomeComponent {
  featuredProducts: Product[] = [
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
  ];
}

