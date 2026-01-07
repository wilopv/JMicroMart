package com.jmicromart.gateway;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
/**
 * Local endpoints used by gateway tests to avoid external services.
 */
class TestBackendController {

  @RequestMapping("/__test/products")
  ResponseEntity<String> products() {
    return ResponseEntity.ok("products-ok");
  }

  @RequestMapping("/__test/users")
  ResponseEntity<String> users() {
    return ResponseEntity.ok("users-ok");
  }
}
