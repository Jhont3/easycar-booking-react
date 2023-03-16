package com.dh.booking.controller;

import com.dh.booking.dto.CarDTO;
import com.dh.booking.dto.ImageDTO;
import com.dh.booking.exceptions.ResourceNotFoundException;
import com.dh.booking.model.Booking;
import com.dh.booking.model.Car;
import com.dh.booking.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cars")
@CrossOrigin(origins = "*")
public class CarController {
    private CarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CarDTO saveCar(@RequestBody CarDTO carDTO){
        return carService.saveCar(carDTO);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> carSearch(@PathVariable("id") Long id) throws ResourceNotFoundException{
        return ResponseEntity.ok(carService.searchCar(id).get());
    }

    @PutMapping
    public ResponseEntity<String> carUpdate (@RequestBody CarDTO carDTO) throws ResourceNotFoundException{
        carService.updateCar(carDTO);
        return ResponseEntity.ok("The car with id: " + carDTO.getId() +", was updated");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> carDelete (@PathVariable Long id) throws ResourceNotFoundException {
        carService.deleteCar(id);
        return ResponseEntity.ok("Car with id " + id + "was deleted successfully");
    }

    @GetMapping
    public ResponseEntity<List<Car>> listCar(){
        return ResponseEntity.ok(carService.carList());
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<List<Car>> listCarByCategory(@PathVariable Long id){
        return ResponseEntity.ok(carService.searchByCategoryId(id));
    }
    @GetMapping("/city/{id}")
    public ResponseEntity<List<Car>> listCarByCity(@PathVariable Long id){
        return ResponseEntity.ok(carService.searchCarByCityId(id));
    }
    @GetMapping("/random")
    public ResponseEntity<List<Car>> carRandom(){return ResponseEntity.ok(carService.searchCarRandom());}

    @GetMapping("/dates/city/{id}")
    public ResponseEntity<List<Car>> searchByDatesAndCity (
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate checkIn,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate checkOut,
            @PathVariable Long id) {
        return ResponseEntity.ok(carService.searchDateAndCity(checkIn, checkOut, id));
    }

    @GetMapping("/dates")
    public ResponseEntity<List<Car>> listCar (@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate checkIn ,
                                              @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate checkOut) {

        return ResponseEntity.ok(carService.searchDate(checkIn, checkOut));
    }



}
