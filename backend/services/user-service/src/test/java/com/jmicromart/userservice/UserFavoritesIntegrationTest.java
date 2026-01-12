package com.jmicromart.userservice;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.jmicromart.userservice.entity.Favorite;
import com.jmicromart.userservice.repository.FavoriteRepository;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
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
 * Integration tests for user favorites endpoints.
 */
class UserFavoritesIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private FavoriteRepository favoriteRepository;

  @BeforeEach
  void clearData() {
    favoriteRepository.deleteAll();
  }

  @Test
  void addFavoriteReturnsCreated() throws Exception {
    mockMvc.perform(post("/api/users/me/favorites/{productId}", 101)
            .header("X-User-Id", "42"))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.userId").value("42"))
        .andExpect(jsonPath("$.productId").value(101));

    assertThat(favoriteRepository.count()).isEqualTo(1);
  }

  @Test
  void addFavoritePreventsDuplicates() throws Exception {
    Favorite existing = new Favorite();
    existing.setUserId("42");
    existing.setProductId(101L);
    favoriteRepository.save(existing);

    mockMvc.perform(post("/api/users/me/favorites/{productId}", 101)
            .header("X-User-Id", "42"))
        .andExpect(status().isConflict());

    assertThat(favoriteRepository.count()).isEqualTo(1);
  }

  @Test
  void listFavoritesReturnsOnlyUserFavorites() throws Exception {
    Favorite first = new Favorite();
    first.setUserId("7");
    first.setProductId(201L);
    Favorite second = new Favorite();
    second.setUserId("7");
    second.setProductId(202L);
    Favorite otherUser = new Favorite();
    otherUser.setUserId("8");
    otherUser.setProductId(999L);
    favoriteRepository.saveAll(List.of(first, second, otherUser));

    mockMvc.perform(get("/api/users/me/favorites")
            .header("X-User-Id", "7"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(2))
        .andExpect(jsonPath("$[*].productId", containsInAnyOrder(201, 202)));
  }

  @Test
  void removeFavoriteDeletesEntry() throws Exception {
    Favorite favorite = new Favorite();
    favorite.setUserId("42");
    favorite.setProductId(333L);
    favoriteRepository.save(favorite);

    mockMvc.perform(delete("/api/users/me/favorites/{productId}", 333)
            .header("X-User-Id", "42"))
        .andExpect(status().isNoContent());

    assertThat(favoriteRepository.count()).isEqualTo(0);
  }

  @Test
  void requestsWithoutHeaderReturnUnauthorized() throws Exception {
    mockMvc.perform(get("/api/users/me/favorites"))
        .andExpect(status().isUnauthorized());

    mockMvc.perform(post("/api/users/me/favorites/{productId}", 10))
        .andExpect(status().isUnauthorized());

    mockMvc.perform(delete("/api/users/me/favorites/{productId}", 10))
        .andExpect(status().isUnauthorized());
  }
}
