package com.jmicromart.gateway.security;

/**
 * Minimal set of JWT claims needed by the gateway.
 */
public record JwtClaims(String subject, String roles) {}
