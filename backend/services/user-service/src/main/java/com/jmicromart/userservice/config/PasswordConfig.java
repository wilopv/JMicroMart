package com.jmicromart.userservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
/**
 * Exposes a BCrypt encoder without enabling Spring Security.
 */
public class PasswordConfig {

  @Bean
  /**
   * BCrypt encoder used to hash user passwords at registration time.
   */
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
