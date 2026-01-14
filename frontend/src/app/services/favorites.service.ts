import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of, switchMap, tap, throwError } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Product } from '../models/product/product.model';
import { Favorite } from '../models/user/favorite.model';
import { extractHttpErrorMessage } from '../utils/http-errors';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favorites = signal<Product[]>([]);
  private loading = signal(false);
  private error = signal<string>('');

  favoritesList = this.favorites.asReadonly();
  loadingState = this.loading.asReadonly();
  errorMessage = this.error.asReadonly();

  totalFavorites = computed(() => this.favorites().length);

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private productService: ProductService
  ) {
    effect(() => {
      if (!this.authService.isAuthenticated()) {
        this.favorites.set([]);
        this.error.set('');
        return;
      }
      this.loadFavorites().subscribe({
        error: () => undefined,
      });
    });
  }

  isFavorite(productId: number) {
    return this.favorites().some((item) => item.id === productId);
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  loadFavorites(): Observable<Product[]> {
    this.loading.set(true);
    this.error.set('');

    return this.http.get<Favorite[]>(`${API_CONFIG.baseUrl}/api/users/me/favorites`).pipe(
      switchMap((favorites) => this.resolveFavorites(favorites)),
      tap((products) => {
        this.favorites.set(products);
        this.loading.set(false);
      }),
      catchError((error) => {
        this.loading.set(false);
        this.error.set(extractHttpErrorMessage(error));
        return throwError(() => error);
      })
    );
  }

  toggleFavorite(product: Product): Observable<void> {
    if (!this.authService.isAuthenticated()) {
      return throwError(() => new Error('Favoritos requieren autenticacion.'));
    }

    if (this.isFavorite(product.id)) {
      return this.removeFavorite(product.id);
    }

    return this.addFavorite(product);
  }

  addFavorite(product: Product): Observable<void> {
    if (this.isFavorite(product.id)) {
      return of(undefined);
    }

    this.error.set('');
    const previous = this.favorites();
    this.favorites.set([...previous, product]);

    return this.http
      .post<void>(`${API_CONFIG.baseUrl}/api/users/me/favorites/${product.id}`, {})
      .pipe(
        catchError((error) => {
          this.favorites.set(previous);
          this.error.set(extractHttpErrorMessage(error));
          return throwError(() => error);
        })
      );
  }

  removeFavorite(productId: number): Observable<void> {
    this.error.set('');
    const previous = this.favorites();
    this.favorites.set(previous.filter((item) => item.id !== productId));

    return this.http.delete<void>(`${API_CONFIG.baseUrl}/api/users/me/favorites/${productId}`).pipe(
      catchError((error) => {
        this.favorites.set(previous);
        this.error.set(extractHttpErrorMessage(error));
        return throwError(() => error);
      })
    );
  }

  private resolveFavorites(items: Favorite[]): Observable<Product[]> {
    if (!items.length) {
      return of([]);
    }

    const productRequests = items.map((item) =>
      this.productService.getProductById(item.productId).pipe(catchError(() => of(null)))
    );

    return forkJoin(productRequests).pipe(map((results) => results.filter(Boolean) as Product[]));
  }
}
