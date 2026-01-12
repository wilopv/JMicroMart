package com.jmicromart.orderservice.dto;

import java.math.BigDecimal;

/**
 * API response for an order item snapshot.
 */
public record OrderItemResponse(
    Long id,
    Long productId,
    String productName,
    BigDecimal price,
    Integer quantity
) {}
