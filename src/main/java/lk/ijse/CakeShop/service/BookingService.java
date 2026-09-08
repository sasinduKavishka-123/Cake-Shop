package lk.ijse.CakeShop.service;

import lk.ijse.CakeShop.dto.BookingDTO;
import lk.ijse.CakeShop.dto.BookingPaymentDTO;
import lk.ijse.CakeShop.dto.UpdatingDTOs.AddBookingDetailDTO;
import lk.ijse.CakeShop.dto.UpdatingDTOs.TimeSlotFilterDTO;
import lk.ijse.CakeShop.dto.formDTOs.BookingFormDTO;
import lk.ijse.CakeShop.dto.printDTOs.BookingPrintDTO;
import lk.ijse.CakeShop.enumerations.BookingStatus;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface BookingService {

    long saveBooking(BookingDTO bookingDTO);

    void addBookingDetails(AddBookingDetailDTO bookingDTO);

    void updateBookingStatus(long bookingId, BookingStatus bookingStatus);

    List<BookingDTO> filterBooking(String bookingId, String userName, String date, Set<String> statuses);

    BookingFormDTO getBookingFormData(long bookingId);

    BookingPrintDTO getBookingById(long bookingId);

    int getBookingCount();

    List<BookingDTO> getThisWeekBookings();

    TimeSlotFilterDTO getBookingsByDateAndCat(LocalDate bookingDate, String category);

    void addPaymentDetails(long id, BookingStatus status, BookingPaymentDTO paymentDTO);

}
