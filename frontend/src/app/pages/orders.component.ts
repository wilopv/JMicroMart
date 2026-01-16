import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { ErrorSnackbarComponent } from '../components/error-snackbar.component';
import { Order, OrderItem } from '../models/order/order.model';
import { extractHttpErrorMessage } from '../utils/http-errors';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink, ErrorSnackbarComponent],
  template: `
    <div class="surface">
      <!-- Header -->
      <div class="border-b border-subtle surface-muted px-4 py-12 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <h1 class="text-4xl font-bold text-strong">Mis Pedidos</h1>
          <p class="mt-2 text-muted">Historial y estado de tus compras</p>
        </div>
      </div>

      <!-- Content -->
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="mb-6">
          <app-error-snackbar *ngIf="error()" [message]="error()" />
        </div>

        <div *ngIf="loading()" class="text-sm text-muted">
          Cargando pedidos...
        </div>

        <div *ngIf="orders().length > 0; else noOrders" class="space-y-4">
          <!-- Orders List -->
          <div *ngFor="let order of orders()" class="card card-interactive rounded-lg p-6 shadow-none">
            <div class="grid gap-6 md:grid-cols-5 items-center">
              <!-- Order ID -->
              <div>
                <p class="text-xs text-subtle uppercase font-semibold">ID de Pedido</p>
                <p class="mt-1 font-mono font-bold text-strong">#{{ order.id }}</p>
              </div>

              <!-- Date -->
              <div>
                <p class="text-xs text-subtle uppercase font-semibold">Fecha</p>
                <p class="mt-1 text-strong">{{ getOrderDate(order) | date: 'dd/MM/yyyy' }}</p>
              </div>

              <!-- Items Count -->
              <div>
                <p class="text-xs text-subtle uppercase font-semibold">Artículos</p>
                <p class="mt-1 text-strong">{{ getItemCount(order) }} producto(s)</p>
              </div>

              <!-- Total -->
              <div>
                <p class="text-xs text-subtle uppercase font-semibold">Total</p>
                <p class="mt-1 text-lg font-bold text-strong">
                  <span>&#36;</span>{{ getOrderTotal(order).toFixed(2) }}
                </p>
              </div>

              <!-- Status -->
              <div class="text-right md:text-left">
                <p class="text-xs text-subtle uppercase font-semibold">Estado</p>
                <span [class]="getStatusClass(order)" class="mt-1 inline-block px-3 py-1 rounded-full text-xs font-semibold">
                  {{ getStatusText(order) }}
                </span>
              </div>
            </div>

            <!-- Order Actions -->
            <div class="mt-4 border-t border-subtle pt-4">
              <button class="btn-link text-sm font-medium">
                Ver Detalles
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <ng-template #noOrders>
          <div *ngIf="!loading()" class="card rounded-lg surface-muted p-12 text-center shadow-none">
            <svg class="mx-auto h-12 w-12 icon-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 class="mt-4 text-lg font-semibold text-strong">No hay pedidos</h3>
            <p class="mt-2 text-muted">Aún no has realizado ninguna compra</p>
            <a
              routerLink="/products"
              class="btn btn-primary mt-6 px-6 py-3 transition-all duration-200 hover:shadow-lg"
            >
              Empezar a Comprar
            </a>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [],
})
export class OrdersComponent {
  orders = signal<Order[]>([]);
  loading = signal(false);
  error = signal('');

  constructor(private ordersService: OrdersService) {
    this.loadOrders();
  }

  getStatusText(order: Order): string {
    const status = this.normalizeStatus(order.status);
    const statusMap: { [key: string]: string } = {
      pending: 'Pendiente',
      processing: 'Procesando',
      shipped: 'Enviado',
      delivered: 'Entregado',
      cancelled: 'Cancelado',
    };
    return statusMap[status] || status || 'Pendiente';
  }

  getStatusClass(order: Order): string {
    const status = this.normalizeStatus(order.status);
    const classMap: { [key: string]: string } = {
      pending: 'status-pill',
      processing: 'status-pill',
      shipped: 'status-pill',
      delivered: 'status-pill',
      cancelled: 'status-pill',
    };
    return classMap[status] || 'status-pill';
  }

  getOrderDate(order: Order): Date {
    if (order.createdAt) {
      return new Date(order.createdAt);
    }
    const fallback = (order as { date?: string | Date }).date;
    return fallback ? new Date(fallback) : new Date();
  }

  getItemCount(order: Order): number {
    if (typeof order.itemsCount === 'number') {
      return order.itemsCount;
    }
    return this.sumItems(order.items);
  }

  getOrderTotal(order: Order): number {
    if (typeof order.total === 'number') {
      return order.total;
    }
    return this.sumItems(order.items, true);
  }

  private loadOrders(): void {
    this.loading.set(true);
    this.error.set('');

    this.ordersService.getOrders().subscribe({
      next: (orders) => {
        const sorted = [...orders].sort((a, b) => {
          const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bTime - aTime;
        });
        this.orders.set(sorted);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(extractHttpErrorMessage(err));
        this.loading.set(false);
      },
    });
  }

  private normalizeStatus(status?: string): string {
    return (status || 'pending').toString().toLowerCase();
  }

  private sumItems(items: OrderItem[] = [], usePrice = false): number {
    return items.reduce((sum, item) => {
      if (usePrice) {
        const price = typeof item.price === 'number' ? item.price : 0;
        return sum + price * item.quantity;
      }
      return sum + item.quantity;
    }, 0);
  }
}
