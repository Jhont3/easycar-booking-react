package com.dh.booking.service;

import com.dh.booking.exceptions.ResourceNotFoundException;
import com.dh.booking.model.Feature;
import com.dh.booking.model.User;
import com.dh.booking.repository.FeatureRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeatureService {

    Logger LOGGER = Logger.getLogger(FeatureService.class);
     private FeatureRepository featureRepository;

    @Autowired
    public FeatureService(FeatureRepository featureRepository) {
        this.featureRepository = featureRepository;
    }

    public List<Feature> featureList(){
        LOGGER.info("Showing all features");
        return featureRepository.findAll();
    }

    public Optional<Feature> getFeature(Long id) throws ResourceNotFoundException {
        LOGGER.info("Searched for feature id: " + id);
        Optional<Feature> featureToSearch= featureRepository.findById(id);
        if (featureToSearch.isPresent()){
            return featureToSearch;
        }
        else{
            throw new ResourceNotFoundException("The feature with id " + id + " does not exist");
        }
    }

    public Feature searchByName(String name) throws ResourceNotFoundException{
        Optional<Feature> featureToSearch = featureRepository.findByName(name);
        if(featureToSearch.isPresent()){
            return featureToSearch.get();
        }else{
            throw new ResourceNotFoundException("The feature with name " + name + " does not exist");
        }

    }

}
