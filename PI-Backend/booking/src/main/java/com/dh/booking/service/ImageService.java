package com.dh.booking.service;

import com.dh.booking.dto.ImageDTO;
import com.dh.booking.model.Car;
import com.dh.booking.model.Image;
import com.dh.booking.repository.ImageRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService {

    Logger LOGGER = Logger.getLogger(ImageService.class);
    private ImageRepository imageRepository;

    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public List<Image> listImages(){
        LOGGER.info("Showing all images");
        return imageRepository.findAll();
    }

    public List<Image> searchImagesByCarId (Long id){
        LOGGER.info("Searched for image by car id: " + id);
        return imageRepository.findImagesByCarId(id);
    }

    public Image imageDtoToImage(ImageDTO imageDTO){

        Image answer = new Image();
        Car car = new Car();

        car.setId(imageDTO.getCars_id());

        answer.setCar(car);
        answer.setId(imageDTO.getId());
        answer.setTitle(imageDTO.getTitle());
        answer.setUrl(imageDTO.getUrl());

        return answer;
    }

    public ImageDTO imageToImageDto(Image image){
        ImageDTO answer = new ImageDTO();

        answer.setCars_id(image.getId());
        answer.setId(image.getId());
        answer.setTitle(image.getTitle());
        answer.setUrl(image.getUrl());

        return answer;
    }

    public ImageDTO saveImage(ImageDTO imageDTO){
        LOGGER.info("A new image has been saved");
        Image imageSave = imageRepository.save(imageDtoToImage(imageDTO));
        return imageToImageDto(imageSave);
    }

    public void deleteImage(Image image){
        imageRepository.delete(image);
    }

}
