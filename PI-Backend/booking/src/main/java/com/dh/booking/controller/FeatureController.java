package com.dh.booking.controller;

import com.dh.booking.exceptions.ResourceNotFoundException;
import com.dh.booking.model.Feature;
import com.dh.booking.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/features")
@CrossOrigin(origins = "*")
public class FeatureController {

    private FeatureService featureService;


    @Autowired
    public FeatureController(FeatureService featureService) {
        this.featureService = featureService;
    }

    @GetMapping
    public ResponseEntity<List<Feature>> listCities() {return ResponseEntity.ok(featureService.featureList());}

    @GetMapping("/{name}")
    public ResponseEntity<Feature> searchByName(@PathVariable String name) throws ResourceNotFoundException {
        return ResponseEntity.ok(featureService.searchByName(name));
    }
}
