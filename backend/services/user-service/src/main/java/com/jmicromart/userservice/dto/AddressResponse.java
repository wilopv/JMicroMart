package com.jmicromart.userservice.dto;

public record AddressResponse(
    Long id,
    String userId,
    String street,
    String city,
    String country,
    String postalCode
) {}
