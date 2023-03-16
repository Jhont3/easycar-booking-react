package com.dh.booking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "features")
public class Feature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String icon;

    @ManyToMany(mappedBy = "featuresSet")
    @JsonIgnore
    private Set<Car> carSet = new HashSet<>();

    public Feature(Long id, String name, String icon, Set<Car> carSet) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.carSet = carSet;
    }

    public Feature(String name, String icon, Set<Car> carSet) {
        this.name = name;
        this.icon = icon;
        this.carSet = carSet;
    }

    public Feature() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Set<Car> getCarSet() {
        return carSet;
    }

    public void setCarSet(Set<Car> carSet) {
        this.carSet = carSet;
    }
}
