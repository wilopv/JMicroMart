package com.jmicromart.orderservice.dto;

import java.util.List;

/**
 * Request payload for creating an order.
 */
public record OrderCreateRequest(
    List<OrderItemRequest> items,
    ShippingAddress shippingAddress
) {

  /**
   * Shipping address snapshot captured at checkout time.
   */
  public record ShippingAddress(
      String street,
      String city,
      String country,
      String postalCode,
      String firstName,
      String lastName
  ) {}
}
