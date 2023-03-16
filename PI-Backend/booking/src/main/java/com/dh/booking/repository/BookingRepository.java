package com.dh.booking.repository;

import com.dh.booking.model.Booking;
import com.dh.booking.model.Car;
import com.dh.booking.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query(value = "SELECT * FROM bookings b " + "WHERE b.client_id = :clientId", nativeQuery = true)
    List<Booking> findByClient(Long clientId);

    @Query(value = "SELECT * FROM bookings b " + "WHERE b.cars_id = :carsId", nativeQuery = true)
    List<Booking> findByCar(Long carsId);
}


