package com.dh.booking.service;

import com.dh.booking.model.City;
import com.dh.booking.model.RentPolicy;
import com.dh.booking.repository.RentPolicyRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RentPolicyService {

    Logger LOGGER = Logger.getLogger(RentPolicyService.class);

    private RentPolicyRepository rentPolicyRepository;

    @Autowired
    public RentPolicyService(RentPolicyRepository rentPolicyRepository) {
        this.rentPolicyRepository = rentPolicyRepository;
    }

    public List<RentPolicy> rentPoliciesList (){
        LOGGER.info("Showing all policies");
        return rentPolicyRepository.findAll();
    }
}
