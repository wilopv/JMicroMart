package com.jmicromart.userservice.repository;

import com.jmicromart.userservice.entity.Favorite;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for user favorites.
 */
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
  List<Favorite> findAllByUserId(String userId);

  boolean existsByUserIdAndProductId(String userId, Long productId);

  Optional<Favorite> findByUserIdAndProductId(String userId, Long productId);
}
