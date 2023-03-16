package com.dh.booking.repository;

import com.dh.booking.model.Booking;
import com.dh.booking.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;


public interface CarRepository extends JpaRepository<Car, Long> {
    @Query("SELECT c FROM Car c WHERE c.category.id = :categoryId")
    List<Car> findCarsByCategoryId(@Param("categoryId") Long categoryId);
    @Query("SELECT c FROM Car c JOIN c.city city WHERE city.id = :cityId")
    List<Car> findCarsByCityId(@Param("cityId") Long cityId);
    @Query(value = "SELECT c FROM Car c ORDER BY RAND()")
    List<Car> findRandomCars();

    @Query(
            value = "select * from cars c " +
                    "where c.id not in" +
                    "(" +
                    "select distinct b.cars_id " +
                    "from bookings b where b.check_out >= :checkIn AND b.check_in <= :checkOut)", nativeQuery = true
    )
    List<Car> findByDate(@Param("checkIn") LocalDate checkIn, @Param("checkOut") LocalDate checkOut);

    @Query(
            value = "select * from cars c " +
                    "where c.cities_id = :cityId and c.id not in" +
                    "(" +
                    "select distinct b.cars_id " +
                    "from bookings b where b.check_out >= :checkIn AND b.check_in <= :checkOut)", nativeQuery = true
    )
    List<Car> findByDateAndCity(@Param("checkIn") LocalDate checkIn, @Param("checkOut") LocalDate checkOut,
                                @Param("cityId") Long cityId);
}

