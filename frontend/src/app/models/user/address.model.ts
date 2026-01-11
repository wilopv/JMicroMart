export interface Address {
  id?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface CreateAddressPayload {
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
