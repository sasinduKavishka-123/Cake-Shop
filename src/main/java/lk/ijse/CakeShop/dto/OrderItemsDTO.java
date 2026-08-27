package lk.ijse.CakeShop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderItemsDTO {

    private long orderItemId;
    private long orderID;
    private long foodItemId;
    private String foodItemName;
    private int qty;
    private BigDecimal price;
    private BigDecimal discount;
    private BigDecimal finalPrice;

}
