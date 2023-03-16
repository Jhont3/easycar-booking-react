package com.dh.booking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @OneToMany(mappedBy = "role" ,fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<User> users = new HashSet<>();


    public Role() {
    }

    public Role(Long id, String name, Set<User> users) {
        this.id = id;
        this.name = name;
        this.users = users;
    }

    public Role(String name, Set<User> users) {
        this.name = name;
        this.users = users;
    }

    public Role(Set<User> users) {
        this.users = users;
    }


    public Long getId() {return id;}

    public void setId(Long id) {this.id = id;}

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public String getName() {return name;}

    public void setName(String name) {this.name = name;}
}
