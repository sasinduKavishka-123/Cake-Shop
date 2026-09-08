package lk.ijse.CakeShop.dto.UpdatingDTOs;

import lk.ijse.CakeShop.dto.OrderPaymentDTO;
import lk.ijse.CakeShop.enumerations.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateOrderPaymentDTO {
    private long id;
    private OrderPaymentDTO paymentDTO;
    private OrderStatus status;
}
