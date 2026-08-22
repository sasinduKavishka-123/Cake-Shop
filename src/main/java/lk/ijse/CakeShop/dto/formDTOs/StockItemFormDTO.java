package lk.ijse.CakeShop.dto.formDTOs;

import lk.ijse.CakeShop.dto.StockItemCatDTO;
import lk.ijse.CakeShop.enumerations.StockStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StockItemFormDTO {
    private long stockItemId;
    private String itemName;
    private int stockQty;
    private String unitOfMeasure;
    private int reorderLevel;
    private StockStatus stockStatus;
    private StockItemCatDTO stockItemCatDTO;

    private List<StockItemCatDTO> categoryList;
}
