package com.jmicromart.userservice;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.jmicromart.userservice.entity.User;
import com.jmicromart.userservice.repository.UserRepository;
import java.util.Objects;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
/**
 * Verifies the authenticated user profile endpoint.
 */
class UserProfileIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private UserRepository userRepository;

  @Test
  void getProfileWithHeaderReturnsUserData() throws Exception {
    User user = new User();
    user.setEmail("me@example.com");
    user.setPassword("hashed");
    user.setRoles("USER");
    User saved = userRepository.save(user);

    mockMvc.perform(get("/api/users/me")
            .header("X-User-Id", Objects.requireNonNull(saved.getId()).toString()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(saved.getId()))
        .andExpect(jsonPath("$.email").value("me@example.com"))
        .andExpect(jsonPath("$.roles").value("USER"));
  }

  @Test
  void getProfileWithoutHeaderReturnsUnauthorized() throws Exception {
    mockMvc.perform(get("/api/users/me"))
        .andExpect(status().isUnauthorized());
  }
}
