package com.jmicromart.orderservice;

import static org.assertj.core.api.Assertions.assertThat;

import com.jmicromart.orderservice.entity.Order;
import com.jmicromart.orderservice.entity.OrderItem;
import com.jmicromart.orderservice.repository.OrderRepository;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

@DataJpaTest
@ActiveProfiles("test")
/**
 * Repository tests for order persistence.
 */
class OrderRepositoryTest {

  @Autowired
  private OrderRepository orderRepository;

  @Test
  void ordersCanBePersisted() {
    Order order = new Order();
    order.setUserId("42");
    order.setStatus("CREATED");
    order.setTotalAmount(new BigDecimal("49.90"));
    order.setCreatedAt(Instant.parse("2026-01-01T10:00:00Z"));

    Order saved = orderRepository.save(order);

    assertThat(saved.getId()).isNotNull();
    assertThat(orderRepository.count()).isEqualTo(1);
  }

  @Test
  void ordersCanContainMultipleItems() {
    Order order = new Order();
    order.setUserId("7");
    order.setStatus("PAID");
    order.setTotalAmount(new BigDecimal("129.99"));
    order.setCreatedAt(Instant.parse("2026-01-01T12:00:00Z"));

    OrderItem first = new OrderItem();
    first.setOrder(order);
    first.setProductId(1001L);
    first.setProductName("Monitor 27 IPS");
    first.setPrice(new BigDecimal("89.99"));
    first.setQuantity(1);

    OrderItem second = new OrderItem();
    second.setOrder(order);
    second.setProductId(2002L);
    second.setProductName("Mouse Ergonomico");
    second.setPrice(new BigDecimal("20.00"));
    second.setQuantity(2);

    order.setItems(List.of(first, second));

    Order saved = orderRepository.save(order);

    Order fetched = orderRepository.findById(saved.getId()).orElseThrow();
    assertThat(fetched.getItems()).hasSize(2);
    assertThat(fetched.getItems().stream().map(OrderItem::getProductId))
        .containsExactlyInAnyOrder(1001L, 2002L);
  }
}
