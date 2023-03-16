package com.dh.booking.repository;

import com.dh.booking.model.RentPolicy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentPolicyRepository extends JpaRepository<RentPolicy, Long> {
}
