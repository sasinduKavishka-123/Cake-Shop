package lk.ijse.CakeShop.service;

import lk.ijse.CakeShop.dto.BookingDTO;
import lk.ijse.CakeShop.dto.UpdatingDTOs.AddBookingDetailDTO;
import lk.ijse.CakeShop.enumerations.BookingStatus;

import java.util.List;
import java.util.Set;

public interface BookingService {

    void saveBooking(BookingDTO bookingDTO);

    void addBookingDetails(AddBookingDetailDTO bookingDTO);

    void updateBookingStatus(long bookingId, BookingStatus bookingStatus);

    List<BookingDTO> filterBooking(String bookingId, String userName, String date, Set<String> statuses);

}
