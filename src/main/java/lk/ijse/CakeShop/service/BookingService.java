package lk.ijse.CakeShop.service;

import lk.ijse.CakeShop.dto.BookingDTO;
import lk.ijse.CakeShop.dto.UpdatingDTOs.AddBookingDetailDTO;
import lk.ijse.CakeShop.enumerations.BookingStatus;

public interface BookingService {

    void saveBooking(BookingDTO bookingDTO);

    void addBookingDetails(AddBookingDetailDTO bookingDTO);

    void updateBookingStatus(long bookingId, BookingStatus bookingStatus);

}
