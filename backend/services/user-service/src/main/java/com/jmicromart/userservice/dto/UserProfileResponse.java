package com.jmicromart.userservice.dto;

/**
 * Response body for the authenticated user profile.
 */
public record UserProfileResponse(
    Long id,
    String email,
    String roles
) {}
