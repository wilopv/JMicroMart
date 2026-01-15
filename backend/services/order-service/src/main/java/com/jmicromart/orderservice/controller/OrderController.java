package com.jmicromart.orderservice.controller;

import com.jmicromart.orderservice.dto.OrderCreateRequest;
import com.jmicromart.orderservice.dto.OrderResponse;
import com.jmicromart.orderservice.dto.OrderSummaryResponse;
import com.jmicromart.orderservice.service.OrderService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
/**
 * Exposes checkout and order listing endpoints.
 */
public class OrderController {

  private final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @PostMapping
  /**
   * Creates a new order for the authenticated user.
   */
  public ResponseEntity<OrderResponse> create(
      @RequestHeader(value = "X-User-Id", required = false) String userId,
      @RequestBody OrderCreateRequest request) {
    if (userId == null || userId.isBlank()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    OrderResponse response = orderService.createOrder(userId, request);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @GetMapping
  /**
   * Lists orders for the authenticated user.
   */
  public ResponseEntity<List<OrderSummaryResponse>> list(
      @RequestHeader(value = "X-User-Id", required = false) String userId) {
    if (userId == null || userId.isBlank()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    return ResponseEntity.ok(orderService.listOrders(userId));
  }

  @GetMapping("/{id}")
  /**
   * Retrieves an order by id for the authenticated user.
   */
  public ResponseEntity<OrderResponse> get(
      @RequestHeader(value = "X-User-Id", required = false) String userId,
      @PathVariable("id") Long id) {
    if (userId == null || userId.isBlank()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    return ResponseEntity.ok(orderService.getOrder(userId, id));
  }
}
