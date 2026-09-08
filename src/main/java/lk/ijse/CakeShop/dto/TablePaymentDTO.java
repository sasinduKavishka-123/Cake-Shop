package lk.ijse.CakeShop.dto;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lk.ijse.CakeShop.entity.Booking;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TablePaymentDTO {

    private long paymentId;
    private long bookingId;
    private LocalDate payDate;
    private BigDecimal payAmount;
    private BigDecimal dueAmount;
    private String payType;

}
