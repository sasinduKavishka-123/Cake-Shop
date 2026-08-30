package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.BookingDTO;
import lk.ijse.CakeShop.dto.UpdatingDTOs.AddBookingDetailDTO;
import lk.ijse.CakeShop.enumerations.BookingStatus;
import lk.ijse.CakeShop.service.BookingService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import static lk.ijse.CakeShop.constatns.ResponseMessage.SUCCESS_MESSAGE;

@RestController
@RequestMapping(value = "v1/booking")
@AllArgsConstructor
public class BookingController {

    private BookingService bookingService;

    @PostMapping(value = "/saveBooking", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse createBooking(@RequestBody BookingDTO bookingDTO){
        bookingService.saveBooking(bookingDTO);
        return new CommonResponse(200, SUCCESS_MESSAGE);
    }

    @PutMapping(value = "/addBookingDetails", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse addBookingDetails(@RequestBody AddBookingDetailDTO bookingDTO){
        bookingService.addBookingDetails(bookingDTO);
        return new CommonResponse(200, SUCCESS_MESSAGE);
    }

    @PatchMapping(value = "/updateBookingStatus", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse updateBookingStatus(
            @RequestParam(value = "booking_id") long bookingId,
            @RequestParam(value = "booking_status") BookingStatus status
    ){
        bookingService.updateBookingStatus(bookingId, status);
        return new CommonResponse(200, SUCCESS_MESSAGE);
    }

}
