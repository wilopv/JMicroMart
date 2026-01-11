package com.jmicromart.productservice.dto;

import java.math.BigDecimal;

/**
 * API response for product listings.
 */
public record ProductResponse(
    Long id,
    String name,
    BigDecimal price,
    String image,
    String category,
    double rating,
    int reviews
) {}
