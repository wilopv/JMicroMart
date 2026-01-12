package com.jmicromart.orderservice.dto;

import java.math.BigDecimal;

/**
 * Request payload for an order item snapshot.
 */
public record OrderItemRequest(
    Long productId,
    String productName,
    BigDecimal price,
    Integer quantity
) {}
