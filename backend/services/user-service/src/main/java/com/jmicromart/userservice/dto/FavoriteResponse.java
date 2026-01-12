package com.jmicromart.userservice.dto;

/**
 * API response for a user favorite entry.
 */
public record FavoriteResponse(
    Long id,
    String userId,
    Long productId
) {}
