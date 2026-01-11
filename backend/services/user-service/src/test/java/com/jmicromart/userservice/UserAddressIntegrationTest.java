package com.jmicromart.userservice;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jmicromart.userservice.dto.AddressRequest;
import com.jmicromart.userservice.entity.Address;
import com.jmicromart.userservice.repository.AddressRepository;
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
 * Verifies address endpoints for an authenticated user.
 */
class UserAddressIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private AddressRepository addressRepository;

  @Test
  void listAddressesForUserReturnsResults() throws Exception {
    Address address = new Address();
    address.setUserId("42");
    address.setStreet("Calle Mayor 1");
    address.setCity("Madrid");
    address.setCountry("Espana");
    address.setPostalCode("28001");
    addressRepository.save(address);

    mockMvc.perform(get("/api/users/me/addresses")
            .header("X-User-Id", "42"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].street").value("Calle Mayor 1"))
        .andExpect(jsonPath("$[0].city").value("Madrid"))
        .andExpect(jsonPath("$[0].country").value("Espana"))
        .andExpect(jsonPath("$[0].postalCode").value("28001"));
  }

  @Test
  void createAddressForUserReturnsCreated() throws Exception {
    AddressRequest request =
        new AddressRequest("Calle Mayor 1", "Madrid", "Espana", "28001");

    mockMvc.perform(post("/api/users/me/addresses")
            .header("X-User-Id", "99")
            .contentType("application/json")
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.userId").value("99"))
        .andExpect(jsonPath("$.street").value("Calle Mayor 1"))
        .andExpect(jsonPath("$.city").value("Madrid"))
        .andExpect(jsonPath("$.country").value("Espana"))
        .andExpect(jsonPath("$.postalCode").value("28001"));
  }

  @Test
  void requestsWithoutHeaderReturnUnauthorized() throws Exception {
    AddressRequest request =
        new AddressRequest("Calle Mayor 1", "Madrid", "Espana", "28001");

    mockMvc.perform(get("/api/users/me/addresses"))
        .andExpect(status().isUnauthorized());

    mockMvc.perform(post("/api/users/me/addresses")
            .contentType("application/json")
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isUnauthorized());
  }
}
