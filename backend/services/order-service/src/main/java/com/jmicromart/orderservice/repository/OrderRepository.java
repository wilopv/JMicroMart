package com.jmicromart.orderservice.repository;

import com.jmicromart.orderservice.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for orders.
 */
public interface OrderRepository extends JpaRepository<Order, Long> {
}
