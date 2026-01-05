package com.jmicromart.userservice.dto;

public record UserResponse(
    Long id,
    String email,
    String roles
) {}
