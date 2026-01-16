import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { CreateOrderRequest, Order } from '../models/order/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  /**
   * Loads the authenticated user's orders from the backend.
   */
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${API_CONFIG.baseUrl}/api/orders`);
  }

  /**
   * Loads an individual order by id.
   */
  getOrderById(orderId: number | string): Observable<Order> {
    return this.http.get<Order>(`${API_CONFIG.baseUrl}/api/orders/${orderId}`);
  }

  /**
   * Creates a new order with the current cart payload.
   */
  createOrder(payload: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(`${API_CONFIG.baseUrl}/api/orders`, payload);
  }
}
