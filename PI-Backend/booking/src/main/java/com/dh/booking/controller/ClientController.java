package com.dh.booking.controller;

import com.dh.booking.exceptions.ResourceNotFoundException;
import com.dh.booking.model.Client;
import com.dh.booking.security.AuthenticationRequest;
import com.dh.booking.security.AuthenticationResponse;
import com.dh.booking.security.UserDetailsConfig;
import com.dh.booking.security.jwt.JwtUtil;
import com.dh.booking.service.AuthenticationService;
import com.dh.booking.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriBuilder;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clients")
@CrossOrigin(origins = "*")
public class ClientController {

    private ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }


    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping
    public ResponseEntity<?> saveClient(@Valid @RequestBody Client client) throws Exception {

        clientService.saveClient(client);
        AuthenticationRequest authenticationRequest = new AuthenticationRequest(client.getEmail(), client.getPassword());
        HttpHeaders headers = new HttpHeaders();
        final UserDetails userDetails = authenticationService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtUtil.generateToken((UserDetailsConfig) userDetails);
        AuthenticationResponse response = new AuthenticationResponse(jwt);
        headers.add("Authorization", response.getJwt());

        return new ResponseEntity<>(response.getJwt(),headers, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> categorySearch(@PathVariable("id") Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(clientService.searchClient(id).get());
    }

    @PutMapping()
    public ResponseEntity<String> updateClient (@RequestBody Client client) throws ResourceNotFoundException {
            clientService.updateClient(client);
            return ResponseEntity.ok("User with id = " + client.getId() + " updated successfully");

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteClient (@PathVariable Long id) throws ResourceNotFoundException{
        clientService.deleteClient(id);
        return ResponseEntity.ok("User with id = " + id + " updated successfully");
    }

    @GetMapping
    public ResponseEntity<List<Client>> getClients () {
        return ResponseEntity.ok(clientService.clientList());
    }
}
