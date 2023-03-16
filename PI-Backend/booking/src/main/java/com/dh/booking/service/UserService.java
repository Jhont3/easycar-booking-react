package com.dh.booking.service;


import com.dh.booking.exceptions.ResourceNotFoundException;
import com.dh.booking.model.Client;
import com.dh.booking.model.Role;
import com.dh.booking.model.User;
import com.dh.booking.repository.UserRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    Logger LOGGER = Logger.getLogger(UserService.class);
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {this.userRepository = userRepository;}


    public User saveUser (User user) throws DuplicateKeyException {
        LOGGER.info("A new user has been saved");
        Optional<User> userToSearch = userRepository.findByEmail(user.getEmail());
        if(userToSearch.isPresent()){

            throw new DuplicateKeyException("Already exists a client with email:" + user.getEmail());
        }
        else{
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
            Role role = new Role();
            role.setId(2L);
            role.setName("Client");
            user.setPassword(encoder.encode(user.getPassword()));
            user.setRole(role);
            return userRepository.save(user); }
         }

    public Optional<User> searchUser (Long id) throws ResourceNotFoundException {
        LOGGER.info("Searched for user id: " + id );
        Optional<User> userToSearch= userRepository.findById(id);
        if (userToSearch.isPresent()){
            return userToSearch;
        }
        else{
            throw new ResourceNotFoundException("The user with id " + id + " does not exist");
        }
    }

    public void updateUser(User user) throws ResourceNotFoundException{
        LOGGER.info("The user with id: "+ user.getId() + " has been updated");
        Optional<User> userUpdate = userRepository.findById(user.getId());
        if(userUpdate.isPresent()){
              userRepository.save(user);}
        else{ throw new ResourceNotFoundException("The car with id " + user.getId() + " does not exist");}
    }

    public void deleteUser(Long id) throws ResourceNotFoundException{
        LOGGER.warn("The user with id: " + id + " has been deleted");
        Optional<User> userToDelete = searchUser(id);
        if (userToDelete.isPresent()){
            userRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("The user with id " + id + " does not exist");
        }
    }

    public List<User> userList() {
        LOGGER.info("Showing all users");
        return userRepository.findAll(); }
}
