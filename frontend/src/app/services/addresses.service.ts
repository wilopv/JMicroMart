import { Injectable } from '@angular/core';

export interface Address {
  id: string;
  label: string;
  recipient: string;
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  private storageKey = 'deliveryAddressesByUser';
  private fallbackData: Address[] = [
    {
      id: 'del-1',
      label: 'Casa',
      recipient: 'Usuario Demo',
      line1: 'Av. Principal 123',
      line2: 'Depto 4B',
      city: 'Ciudad Central',
      region: 'Estado',
      postalCode: '01010',
      country: 'Mexico',
      phone: '+52 55 5555 5555',
      isDefault: true,
    },
  ];

  getAddressesForUser(userId: string): Address[] {
    const stored = this.readStore();
    if (stored[userId]) {
      return stored[userId];
    }

    return this.fallbackData;
  }

  deleteAddress(userId: string, addressId: string): Address[] {
    const stored = this.readStore();
    const updated = (stored[userId] ?? this.fallbackData).filter(
      (address) => address.id !== addressId
    );
    stored[userId] = updated;
    localStorage.setItem(this.storageKey, JSON.stringify(stored));
    return updated;
  }

  private readStore(): Record<string, Address[]> {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return {};
    }
    try {
      return JSON.parse(raw) as Record<string, Address[]>;
    } catch {
      return {};
    }
  }
}
