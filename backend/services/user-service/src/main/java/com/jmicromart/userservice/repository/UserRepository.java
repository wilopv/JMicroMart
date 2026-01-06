package com.jmicromart.userservice.repository;

import com.jmicromart.userservice.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  /**
   * Checks for email existence to enforce uniqueness at the service layer.
   */
  boolean existsByEmail(String email);

  /**
   * Retrieves a user by email for authentication.
   */
  Optional<User> findByEmail(String email);
}
