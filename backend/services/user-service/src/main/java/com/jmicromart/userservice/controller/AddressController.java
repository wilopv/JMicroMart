package com.jmicromart.userservice.controller;

import com.jmicromart.userservice.dto.AddressRequest;
import com.jmicromart.userservice.dto.AddressResponse;
import com.jmicromart.userservice.service.AddressService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users/me/addresses")
/**
 * Exposes address endpoints for the authenticated user.
 */
public class AddressController {

  private final AddressService addressService;

  public AddressController(AddressService addressService) {
    this.addressService = addressService;
  }

  @GetMapping
  /**
   * Lists stored addresses for the authenticated user.
   */
  public ResponseEntity<List<AddressResponse>> list(
      @RequestHeader(value = "X-User-Id", required = false) String userId) {
    if (userId == null || userId.isBlank()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    return ResponseEntity.ok(addressService.listForUser(userId));
  }

  @PostMapping
  /**
   * Creates a new address for the authenticated user.
   */
  public ResponseEntity<AddressResponse> create(
      @RequestHeader(value = "X-User-Id", required = false) String userId,
      @RequestBody AddressRequest request) {
    if (userId == null || userId.isBlank()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    AddressResponse response = addressService.createForUser(userId, request);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }
}
