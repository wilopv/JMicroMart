package com.jmicromart.productservice.controller;

import com.jmicromart.productservice.dto.ProductResponse;
import com.jmicromart.productservice.service.ProductService;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
/**
 * Public read-only product catalog endpoints.
 */
public class ProductController {

  private final ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  @GetMapping
  /**
   * Lists all products in the catalog.
   */
  public List<ProductResponse> getProducts() {
    return productService.getAllProducts();
  }

  @GetMapping("/{id}")
  /**
   * Retrieves a product by id.
   */
  public ProductResponse getProductById(@PathVariable("id") Long id) {
    return productService.getProductById(id);
  }
}
