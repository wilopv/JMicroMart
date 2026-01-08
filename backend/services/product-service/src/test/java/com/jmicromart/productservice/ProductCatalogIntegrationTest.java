package com.jmicromart.productservice;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.jmicromart.productservice.entity.Product;
import com.jmicromart.productservice.repository.ProductRepository;
import java.math.BigDecimal;
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
 * Integration tests for the public product catalog endpoint.
 */
class ProductCatalogIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ProductRepository productRepository;

  @BeforeEach
  void clearData() {
    // Ensure test isolation across runs.
    productRepository.deleteAll();
  }

  @Test
  void getProductsReturnsEmptyArrayWhenNoneExist() throws Exception {
    // Empty catalog should return an empty JSON array.
    mockMvc.perform(get("/api/products"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$.length()").value(0));
  }

  @Test
  void getProductsReturnsExistingProducts() throws Exception {
    // Seed a product and verify it's returned with all fields.
    Product product = new Product();
    product.setName("Auriculares Inalámbricos");
    product.setDescription("Auriculares inalámbricos de alta calidad.");
    product.setPrice(new BigDecimal("12.50"));
    product.setImageUrl("https://example.com/auriculares.jpg");
    productRepository.save(product);

    mockMvc.perform(get("/api/products"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$[0].id").isNumber())
        .andExpect(jsonPath("$[0].name").value("Auriculares Inalámbricos"))
        .andExpect(jsonPath("$[0].description").value("Auriculares inalámbricos de alta calidad."))
        .andExpect(jsonPath("$[0].price").value(12.50))
        .andExpect(jsonPath("$[0].imageUrl").value("https://example.com/auriculares.jpg"));

    assertThat(productRepository.count()).isEqualTo(1);
  }

  @Test
  void getProductByIdReturnsProductWhenItExists() throws Exception {
    Product product = new Product();
    product.setName("Te Muestreo");
    product.setDescription("Mezclas herbales.");
    product.setPrice(new BigDecimal("7.25"));
    product.setImageUrl("https://example.com/te.jpg");
    Product saved = productRepository.save(product);

    mockMvc.perform(get("/api/products/{id}", saved.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(saved.getId()))
        .andExpect(jsonPath("$.name").value("Te Muestreo"))
        .andExpect(jsonPath("$.description").value("Mezclas herbales."))
        .andExpect(jsonPath("$.price").value(7.25))
        .andExpect(jsonPath("$.imageUrl").value("https://example.com/te.jpg"));
  }

  @Test
  void getProductByIdReturnsNotFoundWhenMissing() throws Exception {
    mockMvc.perform(get("/api/products/{id}", 9999))
        .andExpect(status().isNotFound());
  }
}
