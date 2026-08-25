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
    private String stockItemName;
    private String unitOfMeasure;
    private BigDecimal pricePerUnit;
    private int qty;

    public RestockDetailDTO(String stockItemName, BigDecimal pricePerUnit, int qty, String unitOfMeasure) {
        this.stockItemName = stockItemName;
        this.pricePerUnit = pricePerUnit;
        this.qty = qty;
        this.unitOfMeasure = unitOfMeasure;
    }
}
