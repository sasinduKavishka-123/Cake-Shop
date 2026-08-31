package lk.ijse.CakeShop.dto.formDTOs;

import lk.ijse.CakeShop.dto.ReservableTableDTO;
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
public class BookingFormDTO {
    private long bookingId;
    private String userName;
    private String contact;
    private String email;

    private LocalDate bookingCreatedDate;
    private LocalDate bookingDate;
    private String time;
    private int seatCount;
    private String tableCategory;

    private List<BookingDetailFormDTO> bookingDetailDTOS;
    private BigDecimal total;
    private BookingStatus status;

    private List<ReservableTableDTO> tableDTOList;
}
