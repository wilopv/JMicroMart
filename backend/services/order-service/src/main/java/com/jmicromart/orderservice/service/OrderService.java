package com.jmicromart.orderservice.service;

import com.jmicromart.orderservice.dto.OrderCreateRequest;
import com.jmicromart.orderservice.dto.OrderItemRequest;
import com.jmicromart.orderservice.dto.OrderItemResponse;
import com.jmicromart.orderservice.dto.OrderResponse;
import com.jmicromart.orderservice.entity.Order;
import com.jmicromart.orderservice.entity.OrderItem;
import com.jmicromart.orderservice.repository.OrderRepository;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
/**
 * Handles minimal order creation and lookup.
 */
public class OrderService {

  private final OrderRepository orderRepository;

  public OrderService(OrderRepository orderRepository) {
    this.orderRepository = orderRepository;
  }

  public OrderResponse createOrder(String userId, OrderCreateRequest request) {
    Order order = new Order();
    order.setUserId(userId);
    order.setStatus("CREATED");
    order.setCreatedAt(Instant.now());

    List<OrderItem> items = request.items().stream()
        .map(item -> toOrderItem(order, item))
        .toList();
    order.setItems(items);
    order.setTotalAmount(calculateTotal(items));

    Order saved = orderRepository.save(order);
    return toResponse(saved);
  }

  public List<OrderResponse> listOrders(String userId) {
    return orderRepository.findAllByUserId(userId).stream()
        .map(this::toResponse)
        .toList();
  }

  public OrderResponse getOrder(String userId, Long orderId) {
    Order order = orderRepository.findByIdAndUserId(orderId, userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));
    return toResponse(order);
  }

  private BigDecimal calculateTotal(List<OrderItem> items) {
    return items.stream()
        .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
        .reduce(BigDecimal.ZERO, BigDecimal::add);
  }

  private OrderItem toOrderItem(Order order, OrderItemRequest request) {
    OrderItem item = new OrderItem();
    item.setOrder(order);
    item.setProductId(request.productId());
    item.setProductName(request.productName());
    item.setPrice(request.price());
    item.setQuantity(request.quantity());
    return item;
  }

  private OrderResponse toResponse(Order order) {
    List<OrderItemResponse> items = order.getItems().stream()
        .map(item -> new OrderItemResponse(
            item.getId(),
            item.getProductId(),
            item.getProductName(),
            item.getPrice(),
            item.getQuantity()))
        .toList();

    return new OrderResponse(
        order.getId(),
        order.getUserId(),
        order.getStatus(),
        order.getTotalAmount(),
        order.getCreatedAt(),
        items);
  }
}
