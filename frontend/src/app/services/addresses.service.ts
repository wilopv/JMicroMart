import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Address, CreateAddressPayload } from '../models/user/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  constructor(private http: HttpClient) {}

  /**
   * Loads the authenticated user's addresses from the backend.
   */
  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(`${API_CONFIG.baseUrl}/api/users/me/addresses`);
  }

  /**
   * Creates a new address for the authenticated user.
   */
  createAddress(payload: CreateAddressPayload): Observable<Address> {
    return this.http.post<Address>(`${API_CONFIG.baseUrl}/api/users/me/addresses`, payload);
  }
}
