package lk.ijse.CakeShop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderPaymentDTO {

    private long paymentId;
    private long orderId;
    private BigDecimal payAmount;
    private BigDecimal dueAmount;
    private LocalDate payDate;
    private String payType;

}
