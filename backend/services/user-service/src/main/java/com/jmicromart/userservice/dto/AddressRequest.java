package com.jmicromart.userservice.dto;

public record AddressRequest(
    String street,
    String city,
    String country,
    String postalCode
) {}
