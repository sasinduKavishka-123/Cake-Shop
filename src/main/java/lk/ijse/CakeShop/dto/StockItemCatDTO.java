package lk.ijse.CakeShop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StockItemCatDTO {
    private long categoryId;
    private String categoryName;
}
