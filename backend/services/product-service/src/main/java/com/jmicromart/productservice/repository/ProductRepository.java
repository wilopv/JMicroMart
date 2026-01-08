package com.jmicromart.productservice.repository;

import com.jmicromart.productservice.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for catalog products.
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
}
