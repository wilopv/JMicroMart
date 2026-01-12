package com.jmicromart.orderservice.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

/**
 * API response for an order.
 */
public record OrderResponse(
    Long id,
    String userId,
    String status,
    BigDecimal totalAmount,
    Instant createdAt,
    List<OrderItemResponse> items
) {}
