package com.jmicromart.userservice.service;

import com.jmicromart.userservice.dto.AddressRequest;
import com.jmicromart.userservice.dto.AddressResponse;
import com.jmicromart.userservice.entity.Address;
import com.jmicromart.userservice.repository.AddressRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
/**
 * Handles minimal address operations for the authenticated user.
 */
public class AddressService {

  private final AddressRepository addressRepository;

  public AddressService(AddressRepository addressRepository) {
    this.addressRepository = addressRepository;
  }

  /**
   * Returns all stored addresses for a user identifier.
   */
  public List<AddressResponse> listForUser(String userId) {
    return addressRepository.findAllByUserId(userId).stream()
        .map(address -> new AddressResponse(
            address.getId(),
            address.getUserId(),
            address.getStreet(),
            address.getCity(),
            address.getCountry(),
            address.getPostalCode()))
        .toList();
  }

  /**
   * Creates a new address entry for the user identifier.
   */
  public AddressResponse createForUser(String userId, AddressRequest request) {
    Address address = new Address();
    address.setUserId(userId);
    address.setStreet(request.street());
    address.setCity(request.city());
    address.setCountry(request.country());
    address.setPostalCode(request.postalCode());

    Address saved = addressRepository.save(address);
    return new AddressResponse(
        saved.getId(),
        saved.getUserId(),
        saved.getStreet(),
        saved.getCity(),
        saved.getCountry(),
        saved.getPostalCode());
  }

  /**
   * Deletes an address owned by the user identifier.
   */
  public void deleteForUser(String userId, Long addressId) {
    Address address = addressRepository.findByIdAndUserId(addressId, userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Address not found"));
    addressRepository.delete(address);
  }
}
