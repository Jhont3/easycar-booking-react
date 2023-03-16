package com.dh.booking.service;

import com.dh.booking.exceptions.ResourceNotFoundException;
import com.dh.booking.model.City;
import com.dh.booking.model.Client;
import com.dh.booking.repository.CityRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityService {

    Logger LOGGER = Logger.getLogger(CityService.class);
    private CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<City> cityList (){
        LOGGER.info("Showing all cities");
        return cityRepository.findAll();
    }

    public Optional<City> searchCity(Long id) throws ResourceNotFoundException  {
        LOGGER.info("Searched for city id: " + id);
        Optional<City> cityToSearch = cityRepository.findById(id);
        if(cityToSearch.isPresent()){
            return cityToSearch;
        } else {
            throw new ResourceNotFoundException("The city with id " + id + " does not exist");
        }
    }
}
