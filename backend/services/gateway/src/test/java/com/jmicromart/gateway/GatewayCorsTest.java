package com.jmicromart.gateway;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.test.web.reactive.server.WebTestClient.ResponseSpec;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureWebTestClient
@ActiveProfiles("test")
class GatewayCorsTest {

  @LocalServerPort
  private int port;

  @Test
  void preflightAllowsLocalhostForProductsApi() {
    WebTestClient webTestClient = WebTestClient.bindToServer()
        .baseUrl("http://localhost:" + port)
        .build();

    ResponseSpec response = webTestClient.options()
        .uri("/api/products")
        .header("Origin", "http://localhost:4200")
        .header("Access-Control-Request-Method", "GET")
        .exchange();

    response.expectStatus().isOk()
        .expectHeader().valueEquals("Access-Control-Allow-Origin", "http://localhost:4200")
        .expectHeader().value("Access-Control-Allow-Methods",
            value -> assertThat(value).contains("GET", "POST"));
  }
}
