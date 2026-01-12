package com.jmicromart.orderservice.repository;

import com.jmicromart.orderservice.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for order items.
 */
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
