package lk.ijse.CakeShop.dto.UpdatingDTOs;

import lk.ijse.CakeShop.dto.BookingDetailDTO;
import lk.ijse.CakeShop.dto.formDTOs.BookingDetailFormDTO;
import lk.ijse.CakeShop.enumerations.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddBookingDetailDTO {

    private long bookingId;
    private List<BookingDetailFormDTO> bookingDetailDTOS;
    private BookingStatus bookingStatus;

}
