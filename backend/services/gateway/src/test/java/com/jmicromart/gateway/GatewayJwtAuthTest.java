package com.jmicromart.gateway;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.test.web.reactive.server.WebTestClient.ResponseSpec;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class GatewayJwtAuthTest {

  @LocalServerPort
  private int port;

  @Value("${jwt.secret}")
  private String secret;

  @Value("${jwt.expiration-ms}")
  private long expirationMs;

  private final ObjectMapper objectMapper = new ObjectMapper();

  @Test
  void allowsPublicProductsWithoutJwt() {
    WebTestClient client = WebTestClient.bindToServer()
        .baseUrl("http://localhost:" + port)
        .build();

    ResponseSpec response = client.get()
        .uri("/api/products")
        .exchange();

    // Public product catalog must not require authentication.
    response.expectStatus().value(status -> assertThat(status).isNotEqualTo(HttpStatus.UNAUTHORIZED.value()));
  }

  @Test
  void rejectsProtectedRouteWithoutJwt() {
    WebTestClient client = WebTestClient.bindToServer()
        .baseUrl("http://localhost:" + port)
        .build();

    // Protected route should be rejected without a token.
    client.get()
        .uri("/api/users/me")
        .exchange()
        .expectStatus().isUnauthorized();
  }

  @Test
  void allowsProtectedRouteWithValidJwt() throws Exception {
    WebTestClient client = WebTestClient.bindToServer()
        .baseUrl("http://localhost:" + port)
        .build();

    // Valid JWT should authorize access to protected routes.
    String token = generateToken("user-1");

    client.get()
        .uri("/api/users/me")
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
        .exchange()
        .expectStatus().isOk();
  }

  private String generateToken(String subject) throws Exception {
    long now = Instant.now().getEpochSecond();
    long exp = Instant.now().plusMillis(expirationMs).getEpochSecond();
    String header = toBase64Url(Map.of("alg", "HS256", "typ", "JWT"));
    String payload = toBase64Url(Map.of("sub", subject, "iat", now, "exp", exp));
    String signature = sign(header + "." + payload);
    String token = header + "." + payload + "." + signature;
    assertThat(token).isNotEmpty();
    return token;
  }

  private String toBase64Url(Map<String, Object> value) throws Exception {
    byte[] json = objectMapper.writeValueAsBytes(value);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(json);
  }

  private String sign(String data) throws Exception {
    Mac mac = Mac.getInstance("HmacSHA256");
    mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
    return Base64.getUrlEncoder().withoutPadding()
        .encodeToString(mac.doFinal(data.getBytes(StandardCharsets.UTF_8)));
  }
}
