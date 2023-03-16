package com.dh.booking.controller;

import com.dh.booking.exceptions.ResourceNotFoundException;
import com.dh.booking.model.City;
import com.dh.booking.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cities")
@CrossOrigin(origins = "*")
public class CityController {
    private CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping
    public ResponseEntity<List<City>> listCities() {
        return ResponseEntity.ok(cityService.cityList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> citySearch(@PathVariable("id") Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(cityService.searchCity(id).get());
    }
}
