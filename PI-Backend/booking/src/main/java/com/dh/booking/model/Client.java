package com.dh.booking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@PrimaryKeyJoinColumn(name = "id")
public class Client extends User {

    @OneToMany(mappedBy = "client" ,fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Booking> bookings = new HashSet<>();

    public Client(String name, String lastName, String email, String password, String city, Role role, Set<Booking> bookings) {
        super(name, lastName, email, password, city, role, bookings);
    }

    public Client(Long id, String name, String lastName, String email, String password, String city, Role role, Set<Booking> bookings) {
        super(id, name, lastName, email, password, city, role, bookings);
    }

    public Client() {
    }

    public Set<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(Set<Booking> bookings) {
        this.bookings = bookings;
    }


}
