package com.jmicromart.userservice;

import static org.assertj.core.api.Assertions.assertThat;

import com.jmicromart.userservice.dto.RegisterRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
/**
 * Verifies user registration flows through the HTTP endpoint.
 */
class UserRegistrationIntegrationTest {

  @Autowired
  private TestRestTemplate restTemplate;

  @Test
  void registerWithValidDataReturnsCreated() {
    RegisterRequest request = new RegisterRequest("ana@example.com", "secret123");

    ResponseEntity<String> response =
        restTemplate.postForEntity("/api/users/register", request, String.class);

    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    assertThat(response.getBody()).isNotNull();
    assertThat(response.getBody()).contains("\"email\":\"ana@example.com\"");
    assertThat(response.getBody()).doesNotContain("password");
  }

  @Test
  void registeringWithExistingEmailReturnsConflict() {
    RegisterRequest request = new RegisterRequest("dupe@example.com", "secret123");

    restTemplate.postForEntity("/api/users/register", request, String.class);
    ResponseEntity<String> secondAttempt =
        restTemplate.postForEntity("/api/users/register", request, String.class);

    assertThat(secondAttempt.getStatusCode()).isEqualTo(HttpStatus.CONFLICT);
  }
}
