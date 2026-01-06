package com.jmicromart.userservice;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jmicromart.userservice.dto.LoginRequest;
import com.jmicromart.userservice.entity.User;
import com.jmicromart.userservice.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
/**
 * Verifies login responses for valid and invalid credentials.
 */
class UserLoginIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Test
  void loginWithValidCredentialsReturnsToken() throws Exception {
    // Seed a user with a BCrypt password to validate login flow.
    User user = new User();
    user.setEmail("login@example.com");
    user.setPassword(passwordEncoder.encode("secret123"));
    user.setRoles("USER");
    userRepository.save(user);

    LoginRequest request = new LoginRequest("login@example.com", "secret123");

    MvcResult result = mockMvc.perform(post("/api/users/login")
            .contentType("application/json")
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andReturn();

    String body = result.getResponse().getContentAsString();
    assertThat(body).contains("token");
    assertThat(body).doesNotContain("\"token\":\"\"");
  }

  @Test
  void loginWithInvalidCredentialsReturnsUnauthorized() throws Exception {
    // Keep the user but send a bad password to assert 401.
    User user = new User();
    user.setEmail("login-fail@example.com");
    user.setPassword(passwordEncoder.encode("secret123"));
    user.setRoles("USER");
    userRepository.save(user);

    LoginRequest request = new LoginRequest("login-fail@example.com", "wrong");

    mockMvc.perform(post("/api/users/login")
            .contentType("application/json")
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isUnauthorized());
  }
}
