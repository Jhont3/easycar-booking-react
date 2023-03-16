package com.dh.booking.dto;

import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

public class BookingDTO {
    private Long id;


    @NotNull(message = "Star time cannot be null")
    private LocalTime starTime;


    @NotNull(message = "Check in cannot be null")
    private LocalDate checkIn;


    @NotNull(message = "Check in cannot be null")
    private LocalDate checkOut;

    @NotBlank(message = "City is required")
    @NotNull(message = "City cannot be null")
    private String city;

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    private Long cars_id;

    private Long client_id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalTime getStarTime() {
        return starTime;
    }

    public void setStarTime(LocalTime starTime) {
        this.starTime = starTime;
    }

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(LocalDate checkIn) {
        this.checkIn = checkIn;
    }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(LocalDate checkOut) {
        this.checkOut = checkOut;
    }

    public Long getCars_id() {
        return cars_id;
    }

    public void setCars_id(Long cars_id) {
        this.cars_id = cars_id;
    }

    public Long getClient_id() {
        return client_id;
    }

    public void setClient_id(Long client_id) {
        this.client_id = client_id;
    }
}
