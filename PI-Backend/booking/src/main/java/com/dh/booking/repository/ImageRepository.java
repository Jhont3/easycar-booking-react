package com.dh.booking.repository;

import com.dh.booking.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    @Query("SELECT i FROM Image i WHERE i.car.id = :carId")
    List<Image> findImagesByCarId(@Param("carId") Long carId);
}
