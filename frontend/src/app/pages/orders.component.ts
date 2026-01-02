import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface Order {
  id: string;
  date: Date;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
        <div *ngIf="orders.length > 0; else noOrders" class="space-y-4">
          <!-- Orders List -->
          <div *ngFor="let order of orders" class="card card-interactive rounded-lg p-6 shadow-none">
            <div class="grid gap-6 md:grid-cols-5 items-center">
              <!-- Order ID -->
              <div>
                <p class="text-xs text-subtle uppercase font-semibold">ID de Pedido</p>
                <p class="mt-1 font-mono font-bold text-strong">#{{ order.id }}</p>
              </div>

              <!-- Date -->
              <div>
                <p class="text-xs text-subtle uppercase font-semibold">Fecha</p>
                <p class="mt-1 text-strong">{{ order.date | date: 'dd/MM/yyyy' }}</p>
              </div>

              <!-- Items Count -->
              <div>
                <p class="text-xs text-subtle uppercase font-semibold">Artículos</p>
                <p class="mt-1 text-strong">{{ order.items }} producto(s)</p>
              </div>

              <!-- Total -->
              <div>
                <p class="text-xs text-subtle uppercase font-semibold">Total</p>
                <p class="mt-1 text-lg font-bold text-strong">
                  <span>&#36;</span>{{ order.total.toFixed(2) }}
                </p>
              </div>

              <!-- Status -->
              <div class="text-right md:text-left">
                <p class="text-xs text-subtle uppercase font-semibold">Estado</p>
                <span [class]="getStatusClass(order.status)" class="mt-1 inline-block px-3 py-1 rounded-full text-xs font-semibold">
                  {{ getStatusText(order.status) }}
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
          <div class="card rounded-lg surface-muted p-12 text-center shadow-none">
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
  orders: Order[] = [
    {
      id: '10001',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      total: 299.99,
      status: 'delivered',
      items: 2,
    },
    {
      id: '10002',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      total: 149.99,
      status: 'shipped',
      items: 1,
    },
    {
      id: '10003',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      total: 89.99,
      status: 'processing',
      items: 1,
    },
  ];

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      pending: 'Pendiente',
      processing: 'Procesando',
      shipped: 'Enviado',
      delivered: 'Entregado',
      cancelled: 'Cancelado',
    };
    return statusMap[status] || status;
  }

  getStatusClass(status: string): string {
    const classMap: { [key: string]: string } = {
      pending: 'status-pill',
      processing: 'status-pill',
      shipped: 'status-pill',
      delivered: 'status-pill',
      cancelled: 'status-pill',
    };
    return classMap[status] || 'status-pill';
  }
}
