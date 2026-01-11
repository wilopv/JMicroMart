package com.jmicromart.userservice.security;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
/**
 * Minimal JWT generator using HS256 without validation logic.
 */
public class JwtService {

  private final ObjectMapper objectMapper;
  private final byte[] secret;
  private final long expirationMs;

  public JwtService(
      ObjectMapper objectMapper,
      @Value("${jwt.secret}") String secret,
      @Value("${jwt.expiration-ms}") long expirationMs) {
    this.objectMapper = objectMapper;
    this.secret = secret.getBytes(StandardCharsets.UTF_8);
    this.expirationMs = expirationMs;
  }

  public String generateToken(String userId) {
    // Use epoch seconds for iat/exp to keep claims compact.
    long now = Instant.now().getEpochSecond();
    long exp = Instant.now().plusMillis(expirationMs).getEpochSecond();

    String header = toBase64Url(Map.of("alg", "HS256", "typ", "JWT"));
    String payload = toBase64Url(Map.of("sub", userId, "iat", now, "exp", exp));

    String signature = sign(header + "." + payload);
    return header + "." + payload + "." + signature;
  }

  private String toBase64Url(Map<String, Object> value) {
    try {
      byte[] json = objectMapper.writeValueAsBytes(value);
      return Base64.getUrlEncoder().withoutPadding().encodeToString(json);
    } catch (JsonProcessingException ex) {
      throw new IllegalStateException("Failed to serialize JWT payload", ex);
    }
  }

  private String sign(String data) {
    try {
      Mac mac = Mac.getInstance("HmacSHA256");
      mac.init(new SecretKeySpec(secret, "HmacSHA256"));
      return Base64.getUrlEncoder().withoutPadding().encodeToString(
          mac.doFinal(data.getBytes(StandardCharsets.UTF_8)));
    } catch (Exception ex) {
      throw new IllegalStateException("Failed to sign JWT", ex);
    }
  }
}
