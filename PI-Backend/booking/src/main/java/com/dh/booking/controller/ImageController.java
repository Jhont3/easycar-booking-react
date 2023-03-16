package com.dh.booking.controller;

import com.dh.booking.model.Image;
import com.dh.booking.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/images")
@CrossOrigin(origins = "*")
public class ImageController {

    private ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping
    public ResponseEntity<List<Image>> listImages(){
        return ResponseEntity.ok(imageService.listImages());
    }

    @GetMapping("/car/{id}")
    public ResponseEntity<List<Image>> getImagesByCarId(@PathVariable Long id){
        return ResponseEntity.ok(imageService.searchImagesByCarId(id));
    }
}
