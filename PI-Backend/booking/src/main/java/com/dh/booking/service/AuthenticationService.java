package com.dh.booking.service;

import com.dh.booking.model.Client;
import com.dh.booking.repository.ClientRepository;
import com.dh.booking.security.UserDetailsConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService implements UserDetailsService {

    ClientRepository clientRepository;
    @Autowired
    public AuthenticationService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Client client = clientRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Client with email: " + email + " not found"));
        return new UserDetailsConfig(client);
    }


}
