package com.jmicromart.userservice.controller;

import com.jmicromart.userservice.dto.LoginRequest;
import com.jmicromart.userservice.dto.LoginResponse;
import com.jmicromart.userservice.dto.RegisterRequest;
import com.jmicromart.userservice.dto.UserProfileResponse;
import com.jmicromart.userservice.dto.UserResponse;
import com.jmicromart.userservice.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
/**
 * Handles user registration endpoints.
 */
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/register")
  /**
   * Registers a new user and returns the created representation.
   */
  public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
    UserResponse response = userService.register(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @PostMapping("/login")
  /**
   * Authenticates a user and returns a JWT.
   */
  public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
    LoginResponse response = userService.login(request);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/me")
  /**
   * Returns the authenticated user's profile based on gateway headers.
   */
  public ResponseEntity<UserProfileResponse> getProfile(
      @RequestHeader(value = "X-User-Id", required = false) String userId,
      @RequestHeader(value = "X-User-Roles", required = false) String roles) {
    if (userId == null || userId.isBlank()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    UserProfileResponse response = userService.getProfile(Long.parseLong(userId), roles);
    return ResponseEntity.ok(response);
  }
}
