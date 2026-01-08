package com.jmicromart.productservice.repository;

import com.jmicromart.productservice.entity.Product;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for catalog products.
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
  /**
   * Retrieves a product by id.
   */
  Optional<Product> findById(Long id);
}
