package com.jmicromart.gateway;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.stream.Collectors;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class GatewayRoutesTest {

  @Autowired
  private RouteLocator routeLocator;

  @Test
  /**
   * Verifies the Spring context loads and exposes RouteLocator.
   */
  void contextLoads() {
    assertThat(routeLocator).isNotNull();
  }

  @Test
  /**
   * Confirms the gateway includes users and products routes for the active profile.
   */
  void routesIncludeUsersAndProducts() {
    var routeIds = routeLocator.getRoutes().collectList().block().stream()
        .map(route -> route.getId())
        .collect(Collectors.toSet());

    assertThat(routeIds).contains("test-user-service", "test-product-service");
  }
}
