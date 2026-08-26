package lk.ijse.CakeShop.dto.formDTOs;

import lk.ijse.CakeShop.dto.DiscountDTO;
import lk.ijse.CakeShop.dto.FoodItemCategoryDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FoodItemFormDTO {
    private long foodItemId;
    private String foodItemName;
    private BigDecimal price;
    private String imagePath;
    private String description;

    private long foodItemCategoryId;
    private long discountId;

    private List<String> badgesList;
    private List<DiscountDTO> discountList;
    private List<FoodItemCategoryDTO> itemCategorList;
}
