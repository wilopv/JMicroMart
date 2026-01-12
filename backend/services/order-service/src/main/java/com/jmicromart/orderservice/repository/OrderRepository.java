package com.jmicromart.orderservice.repository;

import com.jmicromart.orderservice.entity.Order;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for orders.
 */
public interface OrderRepository extends JpaRepository<Order, Long> {
  List<Order> findAllByUserId(String userId);

  Optional<Order> findByIdAndUserId(Long id, String userId);
}
