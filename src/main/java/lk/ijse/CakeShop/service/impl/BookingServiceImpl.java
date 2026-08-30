package lk.ijse.CakeShop.service.impl;

import lk.ijse.CakeShop.dto.BookingDTO;
import lk.ijse.CakeShop.dto.BookingDetailDTO;
import lk.ijse.CakeShop.dto.UpdatingDTOs.AddBookingDetailDTO;
import lk.ijse.CakeShop.entity.Booking;
import lk.ijse.CakeShop.entity.BookingDetail;
import lk.ijse.CakeShop.entity.ReservableTable;
import lk.ijse.CakeShop.entity.User;
import lk.ijse.CakeShop.enumerations.BookingStatus;
import lk.ijse.CakeShop.exception.CustomException;
import lk.ijse.CakeShop.repository.BookingDetailRepository;
import lk.ijse.CakeShop.repository.BookingRepository;
import lk.ijse.CakeShop.repository.ReservableTableRepository;
import lk.ijse.CakeShop.repository.UserRepository;
import lk.ijse.CakeShop.service.BookingService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.collection.internal.CustomCollectionTypeSemantics;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final BookingDetailRepository bookingDetailRepository;
    private final UserRepository userRepository;
    private final ReservableTableRepository reservableTableRepository;

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

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void addBookingDetails(AddBookingDetailDTO bookingDTO) {
        log.info("Executing Method addBookingDetails()");

        if(bookingDTO.getBookingId() < 1){
            log.error("Error in Method addBookingDetails()");
            throw new CustomException(402, "Invalid Booking ID");
        }

        if(bookingDTO.getBookingDetailDTOS().isEmpty()){
            log.error("Error in Method addBookingDetails()");
            throw new CustomException(402, "Invalid Booking Details");
        }

        Optional<Booking> optionalBooking = bookingRepository.findById(bookingDTO.getBookingId());
        if(optionalBooking.isEmpty()){
            log.error("Error in Method addBookingDetails()");
            throw new CustomException(404, "Booking Not Found");
        }
        Booking booking = optionalBooking.get();

        for(BookingDetailDTO bd : bookingDTO.getBookingDetailDTOS()){
            BookingDetail b = new BookingDetail();
            b.setBooking(booking);
            b.setQyt(bd.getQyt());
            b.setPrice(bd.getPrice());

            // get table ----------
            Optional<ReservableTable> tableOptional = reservableTableRepository.findById(bd.getTableId());
            if(tableOptional.isEmpty()){
                log.error("Error in Method addBookingDetails()");
                throw new CustomException(404, "Table Not Found");
            }
            ReservableTable table = tableOptional.get();
            b.setReservableTable(table);

            bookingDetailRepository.save(b);
        }

        booking.setBookingStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);
    }

    @Override
    public void updateBookingStatus(long bookingId, BookingStatus bookingStatus) {
        log.info("Executing Method updateBookingStatus()");

        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
        if(optionalBooking.isEmpty()){
            log.error("Error in Method updateBookingStatus()");
            throw new CustomException(404, "Booking Not Found");
        }
        Booking booking = optionalBooking.get();

        booking.setBookingStatus(bookingStatus);
        bookingRepository.save(booking);

    }
}
