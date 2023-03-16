package com.dh.booking.service;
import com.dh.booking.dto.CarDTO;
import com.dh.booking.dto.ImageDTO;
import com.dh.booking.exceptions.ResourceNotFoundException;
import com.dh.booking.model.*;
import com.dh.booking.repository.CarRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class CarService {

    Logger LOGGER = Logger.getLogger(CarService.class);

    private CarRepository carRepository;

    @Autowired
    ImageService imageService;

    @Autowired
    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }


    private CarDTO carToCarDTO(Car car) {
        CarDTO answer = new CarDTO();
        answer.setId(car.getId());
        answer.setTitle(car.getTitle());
        answer.setDescription(car.getDescription());
        answer.setCategories_id(car.getCategory().getId());
        answer.setCities_id(car.getCity().getId());
        answer.setRentPolicy(car.getRentPolicy().getId());
        answer.setImages(car.getImages());
        answer.setFeatureSet(car.getFeaturesSet());

        return answer;
    }

    private Car carDTOToCar(CarDTO carDTO) {

        Car answer = new Car();
        Category category = new Category();
        City city = new City();
        RentPolicy rentPolicy = new RentPolicy();

        Set<Feature> featureSet = carDTO.getFeatureSet();


        List<Image> images = carDTO.getImages();


        category.setId(carDTO.getCategories_id());
        city.setId(carDTO.getCities_id());
        rentPolicy.setId(carDTO.getRentPolicy());

        answer.setRentPolicy(rentPolicy);
        answer.setCategory(category);
        answer.setCity(city);
        answer.setTitle(carDTO.getTitle());
        answer.setDescription(carDTO.getDescription());
        answer.setId(carDTO.getId());
        answer.setImages(images);
        answer.setFeaturesSet(featureSet);

        return answer;
    }


    public CarDTO saveCar(CarDTO carDTO) {
        LOGGER.info("A new car has been saved");
        Car carSave = carRepository.save(carDTOToCar(carDTO));
        List<Image> images = carSave.getImages();
        for (Image image : images) {
            ImageDTO imageDTO = imageService.imageToImageDto(image);
            imageDTO.setCars_id(carSave.getId());
            imageService.saveImage(imageDTO);
        }

        return carToCarDTO(carSave);
    }

    public Optional<Car> searchCar(Long id) throws ResourceNotFoundException {
        LOGGER.info("Searched for car id: " + id);
        Optional<Car> carToSearch = carRepository.findById(id);
        if (carToSearch.isPresent()) {
            return carToSearch;
        } else {
            throw new ResourceNotFoundException("The car with id " + id + " does not exist");
        }
    }

    public void updateCar(CarDTO carDTO) throws ResourceNotFoundException {
        LOGGER.info("The car with id: " + carDTO.getId() + " has been updated");

        Optional<Car> carToUpdate = carRepository.findById(carDTO.getId());
        if (carToUpdate.isPresent()) {
            carRepository.save(carDTOToCar(carDTO));
        } else {
            throw new ResourceNotFoundException("The car with id " + carDTO.getId() + " does not exists");
        }
    }

    public void deleteCar(Long id) throws ResourceNotFoundException {
        LOGGER.warn("The car with id: " + id + " has been deleted");
        Optional<Car> carToDelete = searchCar(id);
        if (carToDelete.isPresent()) {
            List<Image> imageList = carToDelete.get().getImages();
            for (Image image : imageList) {
                imageService.deleteImage(image);
            }
            carRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("The car with id " + id + " does not exists");
        }
    }

    public List<Car> carList() {
        LOGGER.info("Showing all cars");
        return carRepository.findAll();
    }

    public List<Car> searchByCategoryId(Long id) {
        LOGGER.info("Showing car list by category id: " + id);
        return carRepository.findCarsByCategoryId(id);
    }

    public List<Car> searchCarByCityId(Long id) {
        LOGGER.info("Showing car list city id: " + id);
        return carRepository.findCarsByCityId(id);
    }

    public List<Car> searchCarRandom() {
        LOGGER.info("Showing random list of car");
        return carRepository.findRandomCars();
    }

    public List<Car> searchDate(LocalDate checkIn, LocalDate checkOut) {
        LOGGER.info("Showing car list by check in date:" + checkIn + " and check out date: " + checkOut);
        return carRepository.findByDate(checkIn, checkOut);
    }

    public List<Car> searchDateAndCity(LocalDate checkIn, LocalDate checkOut, Long id){
        LOGGER.info("Showing car list by check in date:" + checkIn + " and check out date: " + checkOut + "cityId:" + id);
        return carRepository.findByDateAndCity(checkIn, checkOut, id);
    }

}
