package com.dh.booking.service;


import com.dh.booking.exceptions.ResourceNotFoundException;
import com.dh.booking.model.Category;
import com.dh.booking.model.City;
import com.dh.booking.repository.CategoryRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    Logger LOGGER = Logger.getLogger(CategoryService.class);
    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category saveCategory (Category category){
        LOGGER.info("A new category has been saved");
        return categoryRepository.save(category);
    }

    public Optional<Category> searchCategory (Long id) throws ResourceNotFoundException{
       LOGGER.info("Searched for category id: " + id);
        Optional<Category> categoryToSearch = categoryRepository.findById(id);
        if(categoryToSearch.isPresent()){
            return categoryToSearch;
        } else {
            throw new ResourceNotFoundException("The category with id " + id + " does not exist");
        }

    }

    public void updateCategory(Category category) throws ResourceNotFoundException{
        LOGGER.info("The category with id: " + category.getId() + " has been updated");
        Optional<Category> categoryToSearch = categoryRepository.findById(category.getId());
        if (categoryToSearch.isPresent()){
        categoryRepository.save(category);}
        else{
            throw new ResourceNotFoundException("The category with id " + category.getId() + " does not exist");
        }
    }

    public void deleteCategory(Long id) throws ResourceNotFoundException{
        LOGGER.warn("The category with id: " + id + " has been deleted");
        Optional<Category> categoryToDelete = searchCategory(id);
        if(categoryToDelete.isPresent()){
            categoryRepository.deleteById(id);
        }else{
            throw new ResourceNotFoundException("The category with id " + id + " does not exist");
        }
    }

    public List<Category> categoryList(){
        LOGGER.info("Showing all categories");
        return categoryRepository.findAll();
    }

}
