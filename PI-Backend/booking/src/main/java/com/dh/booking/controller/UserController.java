package com.dh.booking.controller;

import com.dh.booking.exceptions.ResourceNotFoundException;
import com.dh.booking.model.Category;
import com.dh.booking.model.User;
import com.dh.booking.service.UserService;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> saveUser(@RequestBody User user){
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> userSearch(@PathVariable("id") Long id) throws ResourceNotFoundException{
        return  ResponseEntity.ok(userService.searchUser(id).get());
        }

    @PutMapping()
    public ResponseEntity<String> updateUser (@RequestBody User user) throws ResourceNotFoundException {
           userService.updateUser(user);
           return ResponseEntity.ok("User with id = " + user.getId() + " updated successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser (@PathVariable Long id) throws ResourceNotFoundException{
            userService.deleteUser(id);
            return ResponseEntity.ok("User with id = " + id + " updated successfully");
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers () {
        return ResponseEntity.ok(userService.userList());
    }
}
