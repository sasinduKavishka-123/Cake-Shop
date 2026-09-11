package lk.ijse.CakeShop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

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
    private BigDecimal discountPercentage;
    private String foodItemCategory;
    private String badges;
    private List<String> badgesList;


    // for Ai
    public FoodItemDTO(String foodItemName, BigDecimal price, String description, String foodItemCategory, String badges) {
        this.foodItemName = foodItemName;
        this.price = price;
        this.description = description;
        this.foodItemCategory = foodItemCategory;
        this.badges = badges;
    }
}
