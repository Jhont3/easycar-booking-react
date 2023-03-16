package com.dh.booking.service;

import com.dh.booking.dto.BookingDTO;
import com.dh.booking.exceptions.ResourceNotFoundException;
import com.dh.booking.model.Booking;
import com.dh.booking.model.Car;
import com.dh.booking.model.Category;
import com.dh.booking.model.Client;
import com.dh.booking.repository.BookingRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    Logger LOGGER = Logger.getLogger(BookingService.class);

    private BookingRepository bookingRepository;

    @Autowired
    ClientService clientService;

    @Autowired
    CarService carService;

    @Autowired

    public BookingService(BookingRepository bookingRepository) {this.bookingRepository = bookingRepository;}

    private Booking bookingDtoToBooking(BookingDTO bookingDTO){
        Booking answer = new Booking();
        Car car = new Car();
        Client client = new Client();

        car.setId(bookingDTO.getCars_id());
        client.setId(bookingDTO.getClient_id());
        client.setCity(bookingDTO.getCity());

        answer.setId(bookingDTO.getId());
        answer.setStarTime(bookingDTO.getStarTime());
        answer.setCheckIn(bookingDTO.getCheckIn());
        answer.setCheckOut(bookingDTO.getCheckOut());
        answer.setCar(car);
        answer.setClient(client);


        return answer;
    }

    private BookingDTO bookingToBookingDto(Booking booking){
        BookingDTO answer = new BookingDTO();

        answer.setId(booking.getId());
        answer.setStarTime(booking.getStarTime());
        answer.setCheckIn(booking.getCheckIn());
        answer.setCheckOut(booking.getCheckOut());
        answer.setCars_id(booking.getCar().getId());
        answer.setClient_id(booking.getClient().getId());
        answer.setCity(booking.getClient().getCity());

        return answer;
    }

    public BookingDTO saveBooking (BookingDTO bookingDTO) throws ResourceNotFoundException {
        LOGGER.info("A new booking has been saved");
        List<Booking> bookingList = bookingRepository.findByCar(bookingDTO.getCars_id());
        for (Booking booking : bookingList) {
            if((bookingDTO.getCheckIn().isBefore(booking.getCheckIn()) && bookingDTO.getCheckOut().isAfter(booking.getCheckOut()))
                    ||(bookingDTO.getCheckIn().isBefore(booking.getCheckIn()) && (bookingDTO.getCheckOut().isAfter(booking.getCheckIn()) && bookingDTO.getCheckOut().isBefore(booking.getCheckOut())))
                    ||(bookingDTO.getCheckIn().isEqual(booking.getCheckIn()) && bookingDTO.getCheckOut().isBefore(booking.getCheckOut()))
                    ||(bookingDTO.getCheckIn().isEqual(booking.getCheckIn()) && bookingDTO.getCheckOut().isAfter(booking.getCheckOut()))
                    ||(bookingDTO.getCheckIn().isAfter(booking.getCheckIn()) && bookingDTO.getCheckOut().isEqual(booking.getCheckOut()))
                    ||(bookingDTO.getCheckIn().isBefore(booking.getCheckIn()) && bookingDTO.getCheckOut().isEqual(booking.getCheckOut()))
                    ||(bookingDTO.getCheckIn().isAfter(booking.getCheckIn()) && bookingDTO.getCheckOut().isBefore(booking.getCheckOut()))
                    ||(bookingDTO.getCheckIn().isEqual(booking.getCheckIn()) && bookingDTO.getCheckOut().isEqual(booking.getCheckOut()))
            )
            {
                throw new RuntimeException("This booking cannot be possible. Please choose a valid date");
            }
        }
        Booking bookingSave = bookingRepository.save(bookingDtoToBooking(bookingDTO));
        Client clientToUpdate = bookingSave.getClient();
        Optional<Client> clientToSearch = clientService.searchClient(bookingDTO.getClient_id());
        clientToUpdate.setCity(bookingDTO.getCity());
        clientToUpdate.setEmail(clientToSearch.get().getEmail());
        clientToUpdate.setId(bookingDTO.getClient_id());
        clientToUpdate.setName(clientToSearch.get().getName());
        clientToUpdate.setLastName(clientToSearch.get().getLastName());
        clientToUpdate.setPassword(clientToSearch.get().getPassword());
        clientToUpdate.setRole(clientToSearch.get().getRole());
        clientService.updateClient(clientToUpdate);

        return bookingToBookingDto(bookingSave);}

    public Optional<Booking> searchBooking (Long id) throws ResourceNotFoundException {
        LOGGER.info("Searched for booking id: " + id);
        Optional<Booking> bookingToSearch = bookingRepository.findById(id);
        if(bookingToSearch.isPresent()){
            return bookingToSearch;
        } else {
            throw new ResourceNotFoundException("The category with id " + id + " does not exist");
        }
       }

    public void updateBooking(BookingDTO bookingDTO) throws ResourceNotFoundException {
        Optional<Booking> bookingToSearch = bookingRepository.findById(bookingDTO.getId());
        if(bookingToSearch.isPresent()){
        bookingRepository.save(bookingDtoToBooking( bookingDTO));
        LOGGER.info("The booking with id: " + bookingDTO.getId() + " has been updated");}
        else{
            throw new ResourceNotFoundException("The booking with id " + bookingDTO.getId() + " does not exist");
        }
    }

    public void deleteBooking(Long id) throws ResourceNotFoundException {
        LOGGER.warn("The booking with id: " + id + " has been deleted");
        Optional<Booking> bookingToDelete = searchBooking(id);
        if (bookingToDelete.isPresent()){
            bookingRepository.deleteById(id);
        } else{
            throw new ResourceNotFoundException("The booking with id " + id + " does not exist");
        }
    }

    public List<Booking> bookingList() {
        LOGGER.info("Showing all bookings");
        return bookingRepository.findAll(); }


    public List<Booking> bookingListByClient(Long clientId) throws ResourceNotFoundException {
        LOGGER.info("Showing all booking by Id client: " + clientId);
        Optional<Client> clientToSearch = clientService.searchClient(clientId);
        if(clientToSearch.isPresent()){
            return bookingRepository.findByClient(clientToSearch.get().getId());}
        else{
            throw new ResourceNotFoundException("The client with id " + clientId + " does not exist");
        }
    }

    public List<Booking> bookingListByCar(Long carsId) throws ResourceNotFoundException {
        LOGGER.info("Showing all booking by Id car: " + carsId);
        Optional<Car> carToSearch = carService.searchCar(carsId);
        if(carToSearch.isPresent()){
            return bookingRepository.findByCar(carToSearch.get().getId());}
        else{
            throw new ResourceNotFoundException("The car with id " + carsId + " does not exist");
        }
    }


}
