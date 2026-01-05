package com.jmicromart.userservice.repository;

import com.jmicromart.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  /**
   * Checks for email existence to enforce uniqueness at the service layer.
   */
  boolean existsByEmail(String email);
}
