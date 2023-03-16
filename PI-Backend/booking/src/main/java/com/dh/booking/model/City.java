package com.dh.booking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cities")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String department;

    @OneToMany(mappedBy = "city",fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Car> cars= new HashSet();

    public Set<Car> getCars() {
        return cars;
    }

    public void setCars(Set<Car> cars) {
        this.cars = cars;
    }

    public City(Long id, String name, String department) {
        this.id = id;
        this.name = name;
        this.department = department;
    }

    public City(String name, String department) {
        this.name = name;
        this.department = department;
    }

    public City() {

    }

    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public String getName() {return name;}

    public void setName(String name) {this.name = name;}

    public String getDepartment() {return department;}

    public void setDepartment(String department) {this.department = department;}
}
