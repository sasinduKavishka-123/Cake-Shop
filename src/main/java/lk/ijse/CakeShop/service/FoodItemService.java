package lk.ijse.CakeShop.service;

import lk.ijse.CakeShop.dto.FoodItemDTO;
import lk.ijse.CakeShop.dto.formDTOs.FoodItemFormDTO;

import java.util.List;

public interface FoodItemService {

    void saveFoodItem(FoodItemDTO foodItemDTO);

    List<FoodItemDTO> filterFoodItems(String itemName, String itemCategory, List<String> badges);

    int getFoodItemCount();

    FoodItemFormDTO getFoodItemFormData(long id);
}
