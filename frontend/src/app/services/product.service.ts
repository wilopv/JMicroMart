import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Product } from '../models/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  /**
   * Loads the full product list from the backend.
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_CONFIG.baseUrl}/api/products`);
  }

  /**
   * Loads a single product detail from the backend.
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_CONFIG.baseUrl}/api/products/${id}`);
  }
}
