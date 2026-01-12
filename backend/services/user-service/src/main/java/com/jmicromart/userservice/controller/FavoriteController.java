package com.jmicromart.userservice.controller;

import com.jmicromart.userservice.dto.FavoriteResponse;
import com.jmicromart.userservice.service.FavoriteService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users/me/favorites")
/**
 * Exposes favorites endpoints for the authenticated user.
 */
public class FavoriteController {

  private final FavoriteService favoriteService;

  public FavoriteController(FavoriteService favoriteService) {
    this.favoriteService = favoriteService;
  }

  @GetMapping
  /**
   * Lists stored favorites for the authenticated user.
   */
  public ResponseEntity<List<FavoriteResponse>> list(
      @RequestHeader(value = "X-User-Id", required = false) String userId) {
    if (userId == null || userId.isBlank()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    return ResponseEntity.ok(favoriteService.listForUser(userId));
  }

  @PostMapping("/{productId}")
  /**
   * Adds a product to the authenticated user's favorites.
   */
  public ResponseEntity<FavoriteResponse> add(
      @RequestHeader(value = "X-User-Id", required = false) String userId,
      @PathVariable("productId") Long productId) {
    if (userId == null || userId.isBlank()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    FavoriteResponse response = favoriteService.addFavorite(userId, productId);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @DeleteMapping("/{productId}")
  /**
   * Removes a product from the authenticated user's favorites.
   */
  public ResponseEntity<Void> remove(
      @RequestHeader(value = "X-User-Id", required = false) String userId,
      @PathVariable("productId") Long productId) {
    if (userId == null || userId.isBlank()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    favoriteService.removeFavorite(userId, productId);
    return ResponseEntity.noContent().build();
  }
}
