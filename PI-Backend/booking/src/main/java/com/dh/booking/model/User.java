package com.dh.booking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column()
    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name is required")
    @Size(min=2,message = "the name must have at least two characters")
    private String name;

    @Column(name = "Last_name")
    @NotNull(message = "Last name cannot be null")
    @NotBlank(message = "Lastname is required")
    @Size(min=2,message = "the name must have at least 2 characters")
    private String lastName;

    @Column(unique = true)
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be a valid email")
    private String email;

    @Column
    @NotNull(message = "Password cannot be null")
    @NotBlank(message = "Password is required")
    @Size(min=7,max = 500,message = "the name must have at least 7 characters")
    private String password;

    @Column
    private String city;

    @ManyToOne
    @JoinColumn(name = "roles_id", referencedColumnName = "id")
    private Role role;


    public User(String name, String lastName, String email, String password,String city, Role role, Set<Booking> bookings) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.city = city;
        this.role = role;
    }

    public User(Long id, String name, String lastName, String email, String password,String city, Role role, Set<Booking> bookings) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.city = city;
        this.role = role;
    }

    public User() {

    }


    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public String getName() {return name;}

    public void setName(String name) {this.name = name;}

    public String getLastName() {return lastName;}

    public void setLastName(String lastName) {this.lastName = lastName;}

    public String getEmail() {return email;}

    public void setEmail(String email) {this.email = email;}

    public String getPassword() {return password;}

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setPassword(String password) {this.password = password;}

    public Role getRole() {return role;}

    public void setRole(Role role) {this.role = role;}

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", city='" + city + '\'' +
                ", role=" + role +
                '}';
    }
}
