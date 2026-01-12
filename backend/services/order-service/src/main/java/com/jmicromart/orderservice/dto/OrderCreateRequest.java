package com.jmicromart.orderservice.dto;

import java.util.List;

/**
 * Request payload for creating an order.
 */
public record OrderCreateRequest(
    List<OrderItemRequest> items
) {}
