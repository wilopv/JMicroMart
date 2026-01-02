import { Injectable, signal, computed, effect } from '@angular/core';
import { AuthService } from './auth.service';

export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private storageKey = 'favoritesByUser';
  private favorites = signal<FavoriteItem[]>([]);

  favoritesList = this.favorites.asReadonly();

  totalFavorites = computed(() => this.favorites().length);

  constructor(private authService: AuthService) {
    effect(() => {
      const user = this.authService.user();
      if (!user) {
        this.favorites.set([]);
        return;
      }
      this.favorites.set(this.loadFavoritesForUser(user.id));
    });

    effect(() => {
      const user = this.authService.user();
      if (!user) {
        return;
      }
      this.saveFavoritesForUser(user.id, this.favorites());
    });
  }

  isFavorite(productId: number) {
    return this.favorites().some((item) => item.id === productId);
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  toggleFavorite(product: FavoriteItem) {
    if (!this.authService.isAuthenticated()) {
      return false;
    }

    if (this.isFavorite(product.id)) {
      this.favorites.set(this.favorites().filter((item) => item.id !== product.id));
      return true;
    }

    this.favorites.set([...this.favorites(), product]);
    return true;
  }

  clearFavorites() {
    this.favorites.set([]);
  }

  private loadFavoritesForUser(userId: string): FavoriteItem[] {
    const store = this.readStore();
    return store[userId] ?? [];
  }

  private saveFavoritesForUser(userId: string, items: FavoriteItem[]) {
    const store = this.readStore();
    store[userId] = items;
    localStorage.setItem(this.storageKey, JSON.stringify(store));
  }

  private readStore(): Record<string, FavoriteItem[]> {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return {};
    }
    try {
      return JSON.parse(raw) as Record<string, FavoriteItem[]>;
    } catch {
      return {};
    }
  }
}
