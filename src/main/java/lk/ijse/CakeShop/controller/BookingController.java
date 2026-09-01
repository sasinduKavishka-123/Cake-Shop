package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.BookingDTO;
import lk.ijse.CakeShop.dto.UpdatingDTOs.AddBookingDetailDTO;
import lk.ijse.CakeShop.dto.formDTOs.BookingFormDTO;
import lk.ijse.CakeShop.enumerations.BookingStatus;
import lk.ijse.CakeShop.service.BookingService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

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

    @GetMapping(value = "/filterBooking", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse filterBookings(
            @RequestParam(value = "booking_id") String bookingId,
            @RequestParam(value = "user_name") String userName,
            @RequestParam(value = "booking_date", required = false) String bookingDate,
            @RequestParam(value = "booking_statuses", required = false) Set<String> statuses
    ){
        List<BookingDTO> bookingDTOList = bookingService.filterBooking(bookingId, userName, bookingDate, statuses);
        return new CommonResponse(200, bookingDTOList, SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/getBookingFormData/{booking_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getBookingFormData(@PathVariable long booking_id){
        BookingFormDTO formDTO = bookingService.getBookingFormData(booking_id);
        return new CommonResponse(200, formDTO, SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/getBookingById/{booking_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getBookingById(@PathVariable long booking_id){
        return new CommonResponse(200, bookingService.getBookingById(booking_id), SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/getBookingCountWithinWeek", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getBookingsWithinWeek(){
        return new CommonResponse(200, bookingService.getBookingCount(), SUCCESS_MESSAGE);
    }

}
