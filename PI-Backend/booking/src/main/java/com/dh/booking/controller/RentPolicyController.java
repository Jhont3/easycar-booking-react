package com.dh.booking.controller;

import com.dh.booking.model.Category;
import com.dh.booking.model.RentPolicy;
import com.dh.booking.service.RentPolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rentPolicies")
@CrossOrigin(origins = "*")
public class RentPolicyController {

    private RentPolicyService rentPolicyService;

    @Autowired
    public RentPolicyController(RentPolicyService rentPolicyService) {
        this.rentPolicyService = rentPolicyService;
    }

    @GetMapping
    public ResponseEntity<List<RentPolicy>> listRentPolicies() {
        return ResponseEntity.ok(rentPolicyService.rentPoliciesList());
    }
}
