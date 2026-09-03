package lk.ijse.CakeShop.dto.printDTOs;

import lk.ijse.CakeShop.dto.OrderItemsDTO;
import lk.ijse.CakeShop.dto.UserDTO;
import lk.ijse.CakeShop.enumerations.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderPrintDTO {
    private long orderId;
    private UserDTO user;
    private LocalDate orderDate;
    private String timeSlot;
    private BigDecimal discount;
    private BigDecimal subTotal;
    private BigDecimal total;
    private OrderStatus orderStatus;
    private List<OrderItemsDTO> orderItems;
}
