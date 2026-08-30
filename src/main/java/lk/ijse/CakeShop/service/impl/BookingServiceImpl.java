package lk.ijse.CakeShop.service.impl;

import lk.ijse.CakeShop.dto.BookingDTO;
import lk.ijse.CakeShop.entity.Booking;
import lk.ijse.CakeShop.entity.User;
import lk.ijse.CakeShop.enumerations.BookingStatus;
import lk.ijse.CakeShop.exception.CustomException;
import lk.ijse.CakeShop.repository.BookingDetailRepository;
import lk.ijse.CakeShop.repository.BookingRepository;
import lk.ijse.CakeShop.repository.UserRepository;
import lk.ijse.CakeShop.service.BookingService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final BookingDetailRepository bookingDetailRepository;
    private final UserRepository userRepository;

    @Override
    public void saveBooking(BookingDTO bookingDTO) {
        log.info("Executing Method saveBooking()");

        if(bookingDTO.getBookingDate() == null){
            log.error("Error in Method saveBooking()");
            throw new CustomException(402, "Invalid Booking date");
        }
        if(bookingDTO.getBookingTime() == null){
            log.error("Error in Method saveBooking()");
            throw new CustomException(402, "Invalid Booking time");
        }
        if(bookingDTO.getBookingCreatedDate() == null){
            log.error("Error in Method saveBooking()");
            throw new CustomException(402, "Invalid Booking created time");
        }
        if(bookingDTO.getTableType() == null){
            log.error("Error in Method saveBooking()");
            throw new CustomException(402, "Invalid table type");
        }
        if(bookingDTO.getSeatCount() < 1){
            log.error("Error in Method saveBooking()");
            throw new CustomException(402, "Invalid seat count");
        }
        if(bookingDTO.getTotal().doubleValue() < 0){
            log.error("Error in Method saveBooking()");
            throw new CustomException(402, "Invalid price");
        }
        if(bookingDTO.getUserId() < 1){
            log.error("Error in Method saveBooking()");
            throw new CustomException(402, "Invalid User ID");
        }

        Optional<User> optionalUser = userRepository.findById(bookingDTO.getUserId());
        if(optionalUser.isEmpty()){
            log.error("Error in Method saveBooking()");
            throw new CustomException(404, "User Not Found");
        }
        User user = optionalUser.get();

        Booking booking = new Booking();

        booking.setUser(user);
        booking.setBookingDate(bookingDTO.getBookingDate());
        booking.setBookingTime(bookingDTO.getBookingTime());
        booking.setBookingCreatedDate(bookingDTO.getBookingCreatedDate());
        booking.setSeatCount(bookingDTO.getSeatCount());
        booking.setTotal(bookingDTO.getTotal());
        booking.setTableType(bookingDTO.getTableType());

        // setting booking status to pending when creating it
        booking.setBookingStatus(BookingStatus.PENDING);

        bookingRepository.save(booking);
    }
}
