package com.dh.booking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;


@Entity
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String url;

    @ManyToOne
    @JoinColumn(name = "cars_id", referencedColumnName = "id")
    @JsonIgnore
    private Car car;

    public Image(Long id, String title, String url, Car car) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.car = car;
    }

    public Image(String title, String url, Car car) {
        this.title = title;
        this.url = url;
        this.car = car;
    }

    public Image(){
    }

    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public String getTitle() {return title;}

    public void setTitle(String title) {this.title = title;}

    public String getUrl() {return url;}

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public void setUrl(String url) {this.url = url;}

}
