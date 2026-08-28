package lk.ijse.CakeShop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TableCategoryDTO {
    private long tableCategoryId;
    private String tableCategoryName;
    private BigDecimal pricePerSeat;
}
