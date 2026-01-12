package com.jmicromart.userservice.service;

import com.jmicromart.userservice.dto.FavoriteResponse;
import com.jmicromart.userservice.entity.Favorite;
import com.jmicromart.userservice.repository.FavoriteRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
/**
 * Handles minimal favorite operations for the authenticated user.
 */
public class FavoriteService {

  private final FavoriteRepository favoriteRepository;

  public FavoriteService(FavoriteRepository favoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  /**
   * Returns all stored favorites for a user identifier.
   */
  public List<FavoriteResponse> listForUser(String userId) {
    return favoriteRepository.findAllByUserId(userId).stream()
        .map(favorite -> new FavoriteResponse(
            favorite.getId(),
            favorite.getUserId(),
            favorite.getProductId()))
        .toList();
  }

  /**
   * Creates a favorite entry for the user identifier and product id.
   */
  public FavoriteResponse addFavorite(String userId, Long productId) {
    if (favoriteRepository.existsByUserIdAndProductId(userId, productId)) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Favorite already exists");
    }

    Favorite favorite = new Favorite();
    favorite.setUserId(userId);
    favorite.setProductId(productId);
    Favorite saved = favoriteRepository.save(favorite);

    return new FavoriteResponse(saved.getId(), saved.getUserId(), saved.getProductId());
  }

  /**
   * Deletes a favorite entry for the user identifier and product id.
   */
  public void removeFavorite(String userId, Long productId) {
    Favorite favorite = favoriteRepository.findByUserIdAndProductId(userId, productId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Favorite not found"));
    favoriteRepository.delete(favorite);
  }
}
