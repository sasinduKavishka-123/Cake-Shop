package lk.ijse.CakeShop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingPaymentDTO {

    private long paymentId;
    private long bookingId;
    private BigDecimal payAmount;
    private BigDecimal dueAmount;
    private LocalDate payDate;
    private String payType;

    public BookingPaymentDTO(BigDecimal payAmount, BigDecimal dueAmount, LocalDate payDate, String payType) {
        this.payAmount = payAmount;
        this.dueAmount = dueAmount;
        this.payDate = payDate;
        this.payType = payType;
    }
}
