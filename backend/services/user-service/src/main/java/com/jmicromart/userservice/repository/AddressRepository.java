package com.jmicromart.userservice.repository;

import com.jmicromart.userservice.entity.Address;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
  List<Address> findAllByUserId(String userId);
}
