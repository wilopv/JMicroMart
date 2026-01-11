package com.jmicromart.productservice.service;

import com.jmicromart.productservice.dto.ProductResponse;
import com.jmicromart.productservice.repository.ProductRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
/**
 * Read-only product catalog operations.
 */
public class ProductService {

  private final ProductRepository productRepository;
  private static final double DEFAULT_RATING = 4.6;
  private static final int DEFAULT_REVIEWS = 28;

  public ProductService(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  public List<ProductResponse> getAllProducts() {
    return productRepository.findAll().stream()
        .map(product -> new ProductResponse(
            product.getId(),
            product.getName(),
            product.getPrice(),
            product.getImageUrl(),
            product.getCategory(),
            DEFAULT_RATING,
            DEFAULT_REVIEWS))
        .toList();
  }

  public ProductResponse getProductById(Long id) {
    var product = productRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

    return new ProductResponse(
        product.getId(),
        product.getName(),
        product.getPrice(),
        product.getImageUrl(),
        product.getCategory(),
        DEFAULT_RATING,
        DEFAULT_REVIEWS);
  }
}
