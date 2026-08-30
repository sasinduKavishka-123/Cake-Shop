package lk.ijse.CakeShop.dto.UpdatingDTOs;

import lk.ijse.CakeShop.dto.BookingDetailDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddBookingDetailDTO {

    private long bookingId;
    private List<BookingDetailDTO> bookingDetailDTOS;

}
