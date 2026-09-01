package lk.ijse.CakeShop.dto.printDTOs;

import lk.ijse.CakeShop.dto.UserDTO;
import lk.ijse.CakeShop.dto.formDTOs.BookingDetailFormDTO;
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
public class BookingPrintDTO {
    private long bookingId;
    private LocalDate bookingCreatedDate;
    private LocalDate bookingDate;
    private String bookingTime;
    private int seatCount;
    private String tableType;
    private BigDecimal total;
    private BookingStatus bookingStatus;

    private UserDTO user;
    private List<BookingDetailFormDTO> bookingDetailList;
}
