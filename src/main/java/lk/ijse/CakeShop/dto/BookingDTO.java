package lk.ijse.CakeShop.dto;

import lk.ijse.CakeShop.enumerations.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingDTO {
    private long bookingId;
    private LocalDate bookingCreatedDate;
    private LocalDate bookingDate;
    private String bookingTime;
    private int seatCount;
    private String tableType;
    private BigDecimal total;
    private BookingStatus bookingStatus;

    private long userId;
    private String userName;
}
