package com.jmicromart.orderservice.dto;

import java.math.BigDecimal;
import java.time.Instant;

/**
 * Summary response for order listings.
 */
public record OrderSummaryResponse(
    Long id,
    Instant createdAt,
    BigDecimal total,
    String status,
    int itemsCount
) {}
