package com.jmicromart.gateway.security;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.MessageDigest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
/**
 * Validates JWTs signed with HS256.
 */
public class JwtValidator {

  private final ObjectMapper objectMapper;
  private final byte[] secret;

  public JwtValidator(ObjectMapper objectMapper, @Value("${jwt.secret}") String secret) {
    this.objectMapper = objectMapper;
    this.secret = secret.getBytes(StandardCharsets.UTF_8);
  }

  public JwtClaims validateAndExtract(String token) {
    String[] parts = token.split("\\.");
    if (parts.length != 3) {
      return null;
    }

    // Ensure the token uses the expected algorithm.
    Map<String, Object> header = decodeJson(parts[0]);
    if (!"HS256".equals(header.get("alg"))) {
      return null;
    }

    // Verify signature before trusting payload.
    if (!isSignatureValid(parts[0], parts[1], parts[2])) {
      return null;
    }

    Map<String, Object> payload = decodeJson(parts[1]);
    Object expValue = payload.get("exp");
    if (expValue == null) {
      return null;
    }

    long exp = toLong(expValue);
    // Enforce expiration.
    if (Instant.now().getEpochSecond() >= exp) {
      return null;
    }

    // Extract subject (user id/email).
    String subject = payload.get("sub") == null ? null : payload.get("sub").toString();
    if (subject == null || subject.isBlank()) {
      return null;
    }

    Object roles = payload.get("roles");
    return new JwtClaims(subject, roles == null ? null : roles.toString());
  }

  private Map<String, Object> decodeJson(String base64Url) {
    try {
      byte[] json = Base64.getUrlDecoder().decode(base64Url);
      return objectMapper.readValue(json, new TypeReference<>() {});
    } catch (Exception ex) {
      return Map.of();
    }
  }

  private boolean isSignatureValid(String header, String payload, String signature) {
    try {
      Mac mac = Mac.getInstance("HmacSHA256");
      mac.init(new SecretKeySpec(secret, "HmacSHA256"));
      byte[] expected = mac.doFinal((header + "." + payload).getBytes(StandardCharsets.UTF_8));
      String expectedSignature = Base64.getUrlEncoder().withoutPadding().encodeToString(expected);
      return MessageDigest.isEqual(
          expectedSignature.getBytes(StandardCharsets.UTF_8),
          signature.getBytes(StandardCharsets.UTF_8));
    } catch (Exception ex) {
      return false;
    }
  }

  private long toLong(Object value) {
    if (value instanceof Number number) {
      return number.longValue();
    }
    try {
      return Long.parseLong(value.toString());
    } catch (NumberFormatException ex) {
      return 0L;
    }
  }
}
