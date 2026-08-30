package lk.ijse.CakeShop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingDetailDTO {

    private long bookingDetailId;
    private long bookingId;
    private long tableId;
    private int qyt;
    private BigDecimal price;

}
