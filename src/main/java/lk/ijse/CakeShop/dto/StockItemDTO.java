package lk.ijse.CakeShop.dto;

import lk.ijse.CakeShop.entity.RestockDetail;
import lk.ijse.CakeShop.entity.StockItemCategory;
import lk.ijse.CakeShop.enumerations.StockStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StockItemDTO {

    private long stockItemId;
    private String itemName;
    private int stockQty;
    private String unitOfMeasure;
    private int reorderLevel;
    private StockStatus stockStatus;

    private StockItemCategory stockItemCategory;
    private long stockItemCategoryId;
    private String stockItemCategoryName;

    public StockItemDTO(long stockItemId, String itemName, int stockQty, String unitOfMeasure, int reorderLevel, StockStatus stockStatus, long stockItemCategoryId) {
        this.stockItemId = stockItemId;
        this.itemName = itemName;
        this.stockQty = stockQty;
        this.unitOfMeasure = unitOfMeasure;
        this.reorderLevel = reorderLevel;
        this.stockItemCategoryId = stockItemCategoryId;
    }
}
