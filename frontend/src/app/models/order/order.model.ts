export interface OrderItem {
  productId: number;
  quantity: number;
  price?: number;
  productName?: string;
  name?: string;
  image?: string;
}

export interface Order {
  id: number | string;
  createdAt?: string;
  status?: string;
  total?: number;
  items: OrderItem[];
  itemsCount?: number;
}

export interface CreateOrderRequest {
  items: Array<{ productId: number; productName: string; price: number; quantity: number }>;
  shippingAddress?: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
    firstName: string;
    lastName: string;
  };
}
