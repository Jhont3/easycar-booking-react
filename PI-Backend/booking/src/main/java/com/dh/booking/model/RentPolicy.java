package com.dh.booking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "rentPolicies")
public class RentPolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String contractAgreement;

    @Column
    private String carInsurance;

    @Column
    private String cancellationPolitics;

    @OneToMany(mappedBy = "rentPolicy",fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Car> cars= new HashSet();

    public RentPolicy(Long id, String contractAgreement, String carInsurance, String cancellationPolitics, Set<Car> cars) {
        this.id = id;
        this.contractAgreement = contractAgreement;
        this.carInsurance = carInsurance;
        this.cancellationPolitics = cancellationPolitics;
        this.cars = cars;
    }

    public RentPolicy() {
    }

    public RentPolicy(String contractAgreement, String carInsurance, String cancellationPolitics, Set<Car> cars) {
        this.contractAgreement = contractAgreement;
        this.carInsurance = carInsurance;
        this.cancellationPolitics = cancellationPolitics;
        this.cars = cars;
    }

    public Set<Car> getCars() {
        return cars;
    }

    public void setCars(Set<Car> cars) {
        this.cars = cars;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContractAgreement() {
        return contractAgreement;
    }

    public void setContractAgreement(String contractAgreement) {
        this.contractAgreement = contractAgreement;
    }

    public String getCarInsurance() {
        return carInsurance;
    }

    public void setCarInsurance(String carInsurance) {
        this.carInsurance = carInsurance;
    }

    public String getCancellationPolitics() {
        return cancellationPolitics;
    }

    public void setCancellationPolitics(String cancellationPolitics) {
        this.cancellationPolitics = cancellationPolitics;
    }
}
