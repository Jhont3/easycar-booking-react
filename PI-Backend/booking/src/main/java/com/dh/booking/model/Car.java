package com.dh.booking.model;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String title;
    @Column
    private String description;

    @OneToMany(mappedBy = "car" ,fetch = FetchType.LAZY)
    //@JsonIgnore
    private List<Image> images = new ArrayList<>();


    @ManyToOne
    @JoinColumn(name = "categories_id", referencedColumnName = "id")
    private Category category;

    @ManyToMany
    @JoinTable(
        name = "car_feature",
        joinColumns = @JoinColumn(name= "cars_id"),
        inverseJoinColumns = @JoinColumn(name="features_id")
    )
    private Set<Feature> featuresSet = new HashSet<>();


    @ManyToOne
    @JoinColumn(name = "cities_id",referencedColumnName = "id")
    private City city;

    @OneToMany(mappedBy = "car" ,fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Booking> bookings = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "rent_policy", referencedColumnName = "id")
    private RentPolicy rentPolicy;

    public Car(Long id, String title, String description, List<Image> images, Category category, Set<Feature> featuresSet, City city, Set<Booking> bookings, RentPolicy rentPolicy) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.images = images;
        this.category = category;
        this.featuresSet = featuresSet;
        this.city = city;
        this.bookings = bookings;
        this.rentPolicy = rentPolicy;
    }

    public Car(String title, String description, List<Image> images, Category category, Set<Feature> featuresSet, City city, Set<Booking> bookings, RentPolicy rentPolicy) {
        this.title = title;
        this.description = description;
        this.images = images;
        this.category = category;
        this.featuresSet = featuresSet;
        this.city = city;
        this.bookings = bookings;
        this.rentPolicy = rentPolicy;
    }

    public RentPolicy getRentPolicy() {
        return rentPolicy;
    }

    public void setRentPolicy(RentPolicy rentPolicy) {
        this.rentPolicy = rentPolicy;
    }

    public Car() {

    }

    public Set<Feature> getFeaturesSet() {
        return featuresSet;
    }

    public void setFeaturesSet(Set<Feature> featuresSet) {
        this.featuresSet = featuresSet;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public Set<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(Set<Booking> bookings) {
        this.bookings = bookings;
    }

    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public String getTitle() {return title;}

    public void setTitle(String title) {this.title = title;}

    public String getDescription() {return description;}

    public void setDescription(String description) {this.description = description;}

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }
}
