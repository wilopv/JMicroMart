package com.jmicromart.userservice.service;

import com.jmicromart.userservice.dto.LoginRequest;
import com.jmicromart.userservice.dto.LoginResponse;
import com.jmicromart.userservice.dto.RegisterRequest;
import com.jmicromart.userservice.dto.UserProfileResponse;
import com.jmicromart.userservice.dto.UserResponse;
import com.jmicromart.userservice.entity.User;
import com.jmicromart.userservice.repository.UserRepository;
import com.jmicromart.userservice.security.JwtService;
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
  private final JwtService jwtService;

  public UserService(
      UserRepository userRepository,
      PasswordEncoder passwordEncoder,
      JwtService jwtService) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
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

  /**
   * Authenticates a user and returns a signed JWT.
   */
  public LoginResponse login(LoginRequest request) {
    User user = userRepository.findByEmail(request.email())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

    if (!passwordEncoder.matches(request.password(), user.getPassword())) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
    }

    return new LoginResponse(jwtService.generateToken(String.valueOf(user.getId())));
  }

  /**
   * Returns the user profile for the given identifier.
   */
  public UserProfileResponse getProfile(Long userId, String rolesOverride) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

    String roles = rolesOverride == null || rolesOverride.isBlank()
        ? user.getRoles()
        : rolesOverride;

    return new UserProfileResponse(user.getId(), user.getEmail(), roles);
  }
}
