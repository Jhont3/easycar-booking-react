package com.dh.booking.controller;

import com.dh.booking.dto.BookingDTO;
import com.dh.booking.exceptions.ResourceNotFoundException;
import com.dh.booking.model.Booking;
import com.dh.booking.model.Category;
import com.dh.booking.repository.BookingRepository;
import com.dh.booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "*")
public class BookingController {

    private BookingService bookingService;
    private final BookingRepository bookingRepository;

    @Autowired

    public BookingController(BookingService bookingService,
                             BookingRepository bookingRepository) {
        this.bookingService = bookingService;
        this.bookingRepository = bookingRepository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingDTO saveBooking (@Valid @RequestBody BookingDTO bookingDTO) throws ResourceNotFoundException{
        return bookingService.saveBooking(bookingDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> bookingSearch(@PathVariable("id") Long id) throws ResourceNotFoundException {
            return ResponseEntity.ok(bookingService.searchBooking(id).get());
        }

    @PutMapping
    public ResponseEntity<String> updateBooking(@RequestBody BookingDTO bookingDTO) throws ResourceNotFoundException {

        bookingService.updateBooking(bookingDTO);
        return ResponseEntity.ok("Booking with id = " + bookingDTO.getId() + " updated successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) throws ResourceNotFoundException {
            bookingService.deleteBooking(id);
            return ResponseEntity.ok("Booking with id: " + id + "deleted successfully");
    }
    @GetMapping
    public ResponseEntity<List<Booking>> bookingList(){
        return ResponseEntity.ok(bookingService.bookingList());
    }

    @GetMapping("/client/{id}")
    public ResponseEntity<List<Booking>> bookingListByClient(@PathVariable("id") Long clientId) throws ResourceNotFoundException {
        return ResponseEntity.ok(bookingService.bookingListByClient(clientId));
    }
    @GetMapping("/car/{id}")
    public ResponseEntity<List<Booking>> bookingListByCar(@PathVariable("id") Long carsId) throws ResourceNotFoundException {
        return ResponseEntity.ok(bookingService.bookingListByCar(carsId));
    }

}
