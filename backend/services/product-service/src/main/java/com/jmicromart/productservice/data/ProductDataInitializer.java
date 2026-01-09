package com.jmicromart.productservice.data;

import com.jmicromart.productservice.entity.Product;
import com.jmicromart.productservice.repository.ProductRepository;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
/**
 * Seeds demo products on startup when the catalog is empty.
 */
public class ProductDataInitializer implements CommandLineRunner {

  private final ProductRepository productRepository;

  public ProductDataInitializer(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  @Override
  public void run(String... args) {
    if (productRepository.count() > 0) {
      return;
    }

    List<Product> products = List.of(
        createProduct(
            "Teclado Mecanico Compacto",
            "Teclas tactiles para escritura rapida.",
            new BigDecimal("59.90"),
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"),
        createProduct(
            "Mouse Ergonomico",
            "Diseno comodo para largas jornadas.",
            new BigDecimal("24.50"),
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80"),
        createProduct(
            "Monitor 27 IPS",
            "Colores vivos para desarrollo y diseno.",
            new BigDecimal("189.00"),
            "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"),
        createProduct(
            "Auriculares con Microfono",
            "Sonido claro para videollamadas.",
            new BigDecimal("39.95"),
            "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80"),
        createProduct(
            "Webcam Full HD",
            "Imagen nitida en reuniones online.",
            new BigDecimal("49.90"),
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"),
        createProduct(
            "Laptop 14 Ultraligera",
            "Rendimiento fluido y bateria duradera.",
            new BigDecimal("899.00"),
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"),
        createProduct(
            "Docking USB-C",
            "Puertos extra para tu escritorio.",
            new BigDecimal("69.00"),
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"),
        createProduct(
            "Disco SSD 1TB",
            "Arranques rapidos y mas espacio.",
            new BigDecimal("79.99"),
            "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80"),
        createProduct(
            "Router WiFi 6",
            "Cobertura estable para todo el hogar.",
            new BigDecimal("109.00"),
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"),
        createProduct(
            "Teclado Numerico",
            "Complemento ideal para contabilidad.",
            new BigDecimal("19.90"),
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80"),
        createProduct(
            "Hub USB 4 Puertos",
            "Conecta varios dispositivos a la vez.",
            new BigDecimal("14.99"),
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"),
        createProduct(
            "Soporte para Portatil",
            "Mejora postura y ventilacion.",
            new BigDecimal("22.00"),
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"),
        createProduct(
            "Alfombrilla XL",
            "Superficie amplia para teclado y mouse.",
            new BigDecimal("12.00"),
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"),
        createProduct(
            "Teclado Inalambrico",
            "Escritura silenciosa sin cables.",
            new BigDecimal("29.90"),
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80"),
        createProduct(
            "Mousepad con Reposamunecas",
            "Soporte suave para la muneca.",
            new BigDecimal("9.90"),
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"),
        createProduct(
            "Cable USB-C 2m",
            "Carga rapida y datos estables.",
            new BigDecimal("6.50"),
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80")
    );

    productRepository.saveAll(products);
  }

  private Product createProduct(String name, String description, BigDecimal price, String imageUrl) {
    Product product = new Product();
    product.setName(name);
    product.setDescription(description);
    product.setPrice(price);
    product.setImageUrl(imageUrl);
    return product;
  }
}
