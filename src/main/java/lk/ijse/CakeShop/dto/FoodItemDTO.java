package lk.ijse.CakeShop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FoodItemDTO {

    private long foodItemId;
    private String foodItemName;
    private BigDecimal price;
    private String description;
    private String imagePath;

    private long foodItemCategoryId;
    private long discountId;
    private Double discount;
    private String foodItemCategory;

}
