package com.jmicromart.gateway.security;

import java.util.List;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import reactor.core.publisher.Mono;

@Component
/**
 * Enforces JWT authentication on protected routes.
 */
public class JwtAuthFilter implements GlobalFilter, Ordered {

  private static final String BEARER_PREFIX = "Bearer ";
  private static final List<String> PUBLIC_POSTS = List.of(
      "/api/users/login",
      "/api/users/register"
  );

  private final JwtValidator jwtValidator;

  public JwtAuthFilter(JwtValidator jwtValidator) {
    this.jwtValidator = jwtValidator;
  }

  @Override
  public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
    ServerHttpRequest request = exchange.getRequest();
    String path = request.getURI().getPath();

    // Skip auth for public endpoints.
    if (isPublicRoute(request.getMethod(), path)) {
      return chain.filter(exchange);
    }

    String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
    // Reject missing or malformed Authorization headers.
    if (authHeader == null || !authHeader.startsWith(BEARER_PREFIX)) {
      exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
      return exchange.getResponse().setComplete();
    }

    String token = authHeader.substring(BEARER_PREFIX.length());
    JwtClaims claims = jwtValidator.validateAndExtract(token);
    // Reject invalid or expired tokens.
    if (claims == null) {
      exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
      return exchange.getResponse().setComplete();
    }

    // Propagate user context to downstream services.
    ServerHttpRequest mutated = exchange.getRequest().mutate()
        .header("X-User-Id", claims.subject())
        .build();

    if (claims.roles() != null && !claims.roles().isBlank()) {
      mutated = mutated.mutate()
          .header("X-User-Roles", claims.roles())
          .build();
    }

    return chain.filter(exchange.mutate().request(mutated).build());
  }

  private boolean isPublicRoute(HttpMethod method, String path) {
    // Allow preflight requests to pass without auth.
    if (HttpMethod.OPTIONS.equals(method)) {
      return true;
    }
    if (HttpMethod.GET.equals(method) && path.startsWith("/api/products")) {
      return true;
    }
    if (HttpMethod.GET.equals(method) && path.startsWith("/docs/")) {
      return true;
    }
    if (HttpMethod.POST.equals(method) && PUBLIC_POSTS.contains(path)) {
      return true;
    }
    return false;
  }

  @Override
  public int getOrder() {
    return -1;
  }
}
