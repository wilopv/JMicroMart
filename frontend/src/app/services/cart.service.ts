import { Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items = signal<CartItem[]>([]);

  cart = this.items.asReadonly();
  private addToCartFeedback = signal(0);
  addToCartToast = this.addToCartFeedback.asReadonly();

  totalItems = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  addToCart(product: { id: number; name: string; price: number; image: string }) {
    const existing = this.items().find((item) => item.id === product.id);

    if (existing) {
      const updated = this.items().map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      this.items.set(updated);
    } else {
      this.items.set([...this.items(), { ...product, quantity: 1 }]);
    }

    this.addToCartFeedback.set(Date.now());
  }

  removeFromCart(productId: number) {
    this.items.set(this.items().filter((item) => item.id !== productId));
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      const updated = this.items().map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      this.items.set(updated);
    }
  }

  clearCart() {
    this.items.set([]);
  }
}
