package com.dh.booking.dto;

import com.dh.booking.model.Feature;
import com.dh.booking.model.Image;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;

public class CarDTO {
    private Long id;
    @NotNull(message = "Title cannot be null")
    @NotBlank(message = "Title is required")
    private String title;
    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description is required")
    private String description;
    @NotNull(message = "Category cannot be null")
    @NotBlank(message = "Category is required")
    private Long categories_id;
    @NotNull(message = "City cannot be null")
    @NotBlank(message = "City is required")
    private Long cities_id;
    private Set<Feature> featureSet;
    private List<Image> images;
    @NotNull(message = "Rent policy cannot be null")
    @NotBlank(message = "Rent policy is required")
    private Long rentPolicy;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCategories_id() {
        return categories_id;
    }

    public void setCategories_id(Long categories_id) {
        this.categories_id = categories_id;
    }

    public Long getCities_id() {
        return cities_id;
    }

    public void setCities_id(Long cities_id) {
        this.cities_id = cities_id;
    }

    public Set<Feature> getFeatureSet() {
        return featureSet;
    }

    public void setFeatureSet(Set<Feature> featureSet) {
        this.featureSet = featureSet;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public Long getRentPolicy() {
        return rentPolicy;
    }

    public void setRentPolicy(Long rentPolicy) {
        this.rentPolicy = rentPolicy;
    }


}
