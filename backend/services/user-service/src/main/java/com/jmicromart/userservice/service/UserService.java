package com.jmicromart.userservice.service;

import com.jmicromart.userservice.dto.RegisterRequest;
import com.jmicromart.userservice.dto.UserResponse;
import com.jmicromart.userservice.entity.User;
import com.jmicromart.userservice.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
/**
 * Business rules for user registration.
 */
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public UserResponse register(RegisterRequest request) {
    // Guard against duplicate emails before persisting. Return 409 Conflict if found.
    if (userRepository.existsByEmail(request.email())) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
    }

    User user = new User();
    // Persist a hashed password and default role.
    user.setEmail(request.email().trim());
    user.setPassword(passwordEncoder.encode(request.password()));
    user.setRoles("USER");

    User saved = userRepository.save(user);
    return new UserResponse(saved.getId(), saved.getEmail(), saved.getRoles());
  }
}
