package lk.ijse.CakeShop.dto;

import lk.ijse.CakeShop.entity.User;
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
public class PlaceOrderDTO {

    private long orderId;
    private long userId;
    private String userName;
    private UserDTO user;
    private LocalDate orderDate;
    private String timeSlot;
    private BigDecimal discount;
    private BigDecimal subTotal;
    private BigDecimal total;
    private OrderStatus orderStatus;
    private List<OrderItemsDTO> orderItems;
    private String orderNote;

}
