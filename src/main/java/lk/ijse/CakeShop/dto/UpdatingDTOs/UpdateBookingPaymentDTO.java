package lk.ijse.CakeShop.dto.UpdatingDTOs;

import lk.ijse.CakeShop.dto.BookingPaymentDTO;
import lk.ijse.CakeShop.enumerations.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateBookingPaymentDTO {
    private long id;
    private BookingPaymentDTO paymentDTO;
    private BookingStatus status;
}
