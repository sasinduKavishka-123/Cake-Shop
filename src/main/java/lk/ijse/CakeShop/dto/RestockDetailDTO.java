package lk.ijse.CakeShop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RestockDetailDTO {
    private long restockDetailId;
    private long restockId;
    private long stockItemId;
    private BigDecimal pricePerUnit;
    private int qty;
}
