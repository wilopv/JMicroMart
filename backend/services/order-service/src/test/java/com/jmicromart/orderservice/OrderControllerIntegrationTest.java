package com.jmicromart.orderservice;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jmicromart.orderservice.dto.OrderCreateRequest;
import com.jmicromart.orderservice.dto.OrderItemRequest;
import com.jmicromart.orderservice.entity.Order;
import com.jmicromart.orderservice.entity.OrderItem;
import com.jmicromart.orderservice.repository.OrderRepository;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
/**
 * Integration tests for checkout and order listing endpoints.
 */
class OrderControllerIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private OrderRepository orderRepository;

  @BeforeEach
  void clearData() {
    orderRepository.deleteAll();
  }

  @Test
  void createOrderReturnsCreated() throws Exception {
    OrderCreateRequest request = new OrderCreateRequest(List.of(
        new OrderItemRequest(1001L, "Monitor 27 IPS", new BigDecimal("89.99"), 1),
        new OrderItemRequest(2002L, "Mouse Ergonomico", new BigDecimal("20.00"), 2)
    ), null);

    mockMvc.perform(post("/api/orders")
            .header("X-User-Id", "42")
            .contentType("application/json")
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").isNumber())
        .andExpect(jsonPath("$.userId").value("42"))
        .andExpect(jsonPath("$.status").value("CREATED"))
        .andExpect(jsonPath("$.totalAmount").value(129.99))
        .andExpect(jsonPath("$.createdAt").isNotEmpty())
        .andExpect(jsonPath("$.items.length()").value(2))
        .andExpect(jsonPath("$.items[*].productId", containsInAnyOrder(1001, 2002)));

    assertThat(orderRepository.count()).isEqualTo(1);
  }

  @Test
  void listOrdersReturnsOnlyUserOrders() throws Exception {
    Order first = new Order();
    first.setUserId("7");
    first.setStatus("CREATED");
    first.setTotalAmount(new BigDecimal("10.00"));
    first.setCreatedAt(Instant.parse("2026-01-02T10:00:00Z"));
    OrderItem item = new OrderItem();
    item.setOrder(first);
    item.setProductId(301L);
    item.setProductName("Teclado");
    item.setPrice(new BigDecimal("10.00"));
    item.setQuantity(1);
    first.setItems(List.of(item));

    Order second = new Order();
    second.setUserId("8");
    second.setStatus("CREATED");
    second.setTotalAmount(new BigDecimal("5.00"));
    second.setCreatedAt(Instant.parse("2026-01-02T11:00:00Z"));

    orderRepository.saveAll(List.of(first, second));

    mockMvc.perform(get("/api/orders")
            .header("X-User-Id", "7"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(1))
        .andExpect(jsonPath("$[0].id").isNumber())
        .andExpect(jsonPath("$[0].createdAt").isNotEmpty())
        .andExpect(jsonPath("$[0].total").value(10.00))
        .andExpect(jsonPath("$[0].status").value("CREATED"))
        .andExpect(jsonPath("$[0].itemsCount").value(1));
  }

  @Test
  void getOrderPreventsOtherUserAccess() throws Exception {
    Order order = new Order();
    order.setUserId("9");
    order.setStatus("CREATED");
    order.setTotalAmount(new BigDecimal("25.00"));
    order.setCreatedAt(Instant.parse("2026-01-02T12:00:00Z"));
    Order saved = orderRepository.save(order);

    mockMvc.perform(get("/api/orders/{id}", saved.getId())
            .header("X-User-Id", "10"))
        .andExpect(status().isNotFound());
  }

  @Test
  void requestsWithoutHeaderReturnUnauthorized() throws Exception {
    OrderCreateRequest request = new OrderCreateRequest(List.of(
        new OrderItemRequest(500L, "Hub USB", new BigDecimal("14.99"), 1)
    ), null);

    mockMvc.perform(post("/api/orders")
            .contentType("application/json")
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isUnauthorized());

    mockMvc.perform(get("/api/orders"))
        .andExpect(status().isUnauthorized());

    mockMvc.perform(get("/api/orders/{id}", 1))
        .andExpect(status().isUnauthorized());
  }

  @Test
  void createOrderPersistsShippingAddress() throws Exception {
    OrderCreateRequest.ShippingAddress shippingAddress = new OrderCreateRequest.ShippingAddress(
        "123 Market St",
        "San Francisco",
        "US",
        "94105",
        "Ada",
        "Lovelace"
    );

    OrderCreateRequest request = new OrderCreateRequest(List.of(
        new OrderItemRequest(777L, "Notebook", new BigDecimal("9.99"), 1)
    ), shippingAddress);

    mockMvc.perform(post("/api/orders")
            .header("X-User-Id", "55")
            .contentType("application/json")
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").isNumber())
        .andExpect(jsonPath("$.shippingStreet").value("123 Market St"))
        .andExpect(jsonPath("$.shippingCity").value("San Francisco"))
        .andExpect(jsonPath("$.shippingCountry").value("US"))
        .andExpect(jsonPath("$.shippingPostalCode").value("94105"))
        .andExpect(jsonPath("$.shippingFirstName").value("Ada"))
        .andExpect(jsonPath("$.shippingLastName").value("Lovelace"));

    Order saved = orderRepository.findAll().stream().findFirst().orElseThrow();
    assertThat(saved.getShippingStreet()).isEqualTo("123 Market St");
    assertThat(saved.getShippingCity()).isEqualTo("San Francisco");
    assertThat(saved.getShippingCountry()).isEqualTo("US");
    assertThat(saved.getShippingPostalCode()).isEqualTo("94105");
    assertThat(saved.getShippingFirstName()).isEqualTo("Ada");
    assertThat(saved.getShippingLastName()).isEqualTo("Lovelace");
  }
}
