package com.jmicromart.productservice.dto;

import java.math.BigDecimal;

/**
 * API response for product listings.
 */
public record ProductResponse(
    Long id,
    String name,
    String description,
    BigDecimal price,
    String imageUrl
) {}
