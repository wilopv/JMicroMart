package com.jmicromart.userservice.repository;

import com.jmicromart.userservice.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for user favorites.
 */
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
}
