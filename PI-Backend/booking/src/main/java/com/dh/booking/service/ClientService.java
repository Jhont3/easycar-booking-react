package com.dh.booking.service;

import com.dh.booking.exceptions.ResourceNotFoundException;
import com.dh.booking.model.Client;
import com.dh.booking.model.Role;
import com.dh.booking.repository.ClientRepository;
import com.dh.booking.security.AuthenticationResponse;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    Logger LOGGER = Logger.getLogger(ClientService.class);
    private ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Client saveClient (Client client) throws DuplicateKeyException {

        Optional<Client> clientToSearch = clientRepository.findByEmail(client.getEmail());
         if(clientToSearch.isPresent()){
             throw new DuplicateKeyException("Already exists a client with email:" + client.getEmail());
         }
         else{
             BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
             Role role = new Role();
             role.setId(2L);
             role.setName("Client");
             client.setPassword(encoder.encode(client.getPassword()));
             client.setRole(role);
        return clientRepository.save(client); }
    }

    public Optional<Client> searchClient (Long id) throws ResourceNotFoundException{
        LOGGER.info("Searched for client id: " + id);
        Optional<Client> clientToSearch = clientRepository.findById(id);
        if(clientToSearch.isPresent()){
        return clientToSearch;
        } else {
            throw new ResourceNotFoundException("The client with id " + id + " does not exist");
        }
    }


    public void updateClient(Client client)throws ResourceNotFoundException {
        LOGGER.info("The client with id: " + client.getId() + " has been updated");
        Optional<Client> clientToSearch = clientRepository.findById(client.getId());
        if(clientToSearch.isPresent()){
        clientRepository.save(client);}
        else{
            throw new ResourceNotFoundException("The car with id " + client.getId() + " does not exist");
        }
        }

    public void deleteClient(Long id) throws ResourceNotFoundException{
        LOGGER.warn("The client with id: " + id + " has been deleted");
        Optional<Client> clientToDelete = searchClient(id);
        if (clientToDelete.isPresent()){
            clientRepository.deleteById(id);
        }else{
            throw new ResourceNotFoundException("The client with id " + id + " does not exist");
        }
    }

    public List<Client> clientList() {
        LOGGER.info("Showing all clients");
        return clientRepository.findAll(); }
}
