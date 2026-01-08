package com.jmicromart.productservice.service;

import com.jmicromart.productservice.dto.ProductResponse;
import com.jmicromart.productservice.repository.ProductRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
/**
 * Read-only product catalog operations.
 */
public class ProductService {

  private final ProductRepository productRepository;

  public ProductService(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  public List<ProductResponse> getAllProducts() {
    return productRepository.findAll().stream()
        .map(product -> new ProductResponse(
            product.getId(),
            product.getName(),
            product.getDescription(),
            product.getPrice(),
            product.getImageUrl()))
        .toList();
  }
}
