package lk.ijse.CakeShop.service.impl;

import lk.ijse.CakeShop.dto.FoodItemDTO;
import lk.ijse.CakeShop.entity.Discount;
import lk.ijse.CakeShop.entity.FoodItem;
import lk.ijse.CakeShop.entity.FoodItemCategory;
import lk.ijse.CakeShop.exception.CustomException;
import lk.ijse.CakeShop.repository.DiscountRepository;
import lk.ijse.CakeShop.repository.FoodItemCategoryRepository;
import lk.ijse.CakeShop.repository.FoodItemRepository;
import lk.ijse.CakeShop.service.FoodItemService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
@AllArgsConstructor
public class FoodItemServiceImpl implements FoodItemService {

    private final FoodItemRepository foodItemRepository;
    private final FoodItemCategoryRepository foodItemCategoryRepository;
    private final DiscountRepository discountRepository;

    @Override
    public void saveFoodItem(FoodItemDTO foodItemDTO) {
        log.info("Executing Method saveFoodItem()");
        if(foodItemDTO.getFoodItemName().isEmpty()){
            log.error("Error in Method saveFoodItem()");
            throw new CustomException(402, "INVALID ITEM NAME");
        }
        if(foodItemDTO.getImagePath().isEmpty()){
            log.error("Error in Method saveFoodItem()");
            throw new CustomException(402, "INVALID IMAGE PATH");
        }
        if(foodItemDTO.getPrice().doubleValue() < 0){
            log.error("Error in Method saveFoodItem()");
            throw new CustomException(402, "INVALID ITEM PRICE");
        }
        if(foodItemDTO.getFoodItemCategoryId() < 0){
            log.error("Error in Method saveFoodItem()");
            throw new CustomException(402, "INVALID ITEM CATEGORY");
        }
        if(foodItemDTO.getDiscountId() < 0){
            foodItemDTO.setDiscountId(1);       // 0 discount rate
        }

        FoodItem foodItemByName = foodItemRepository.findFoodItemByName(foodItemDTO.getFoodItemName());
        if(foodItemByName != null){
            log.error("Error in Method saveFoodItem()");
            throw new CustomException(400, "FOOD ITEM ALREADY EXIST");
        }

        FoodItem foodItem = new FoodItem();

        if(foodItemDTO.getFoodItemId() > 0){
            Optional<FoodItem> optionalFoodItem = foodItemRepository.findById(foodItemDTO.getFoodItemId());
            if(optionalFoodItem.isEmpty()){
                log.error("Error in Method saveFoodItem()");
                throw new CustomException(404, "FOOD ITEM NOT FOUND");
            }
            foodItem = optionalFoodItem.get();
        }

        Optional<FoodItemCategory> optionalCat = foodItemCategoryRepository.findById(foodItemDTO.getFoodItemCategoryId());
        if(optionalCat.isEmpty()){
            log.error("Error in Method saveFoodItem()");
            throw new CustomException(404, "FOOD ITEM CATEGORY NOT FOUND");
        }
        FoodItemCategory itemCategory = optionalCat.get();

        Optional<Discount> optionalDiscount = discountRepository.findById(foodItemDTO.getDiscountId());
        if(optionalDiscount.isEmpty()){
            log.error("Error in Method saveFoodItem()");
            throw new CustomException(402, "INVALID DISCOUNT");
        }
        Discount discount = optionalDiscount.get();

        foodItem.setFoodItemName(foodItemDTO.getFoodItemName());
        foodItem.setPrice(foodItemDTO.getPrice());
        foodItem.setFoodItemCategory(itemCategory);
        foodItem.setDiscount(discount);
        foodItem.setImagePath(foodItemDTO.getImagePath());
        foodItem.setDescription(foodItemDTO.getDescription());
        foodItem.setBadges(foodItemDTO.getBadges());

        foodItemRepository.save(foodItem);
    }

    @Override
    public List<FoodItemDTO> filterFoodItems(String itemName, String itemCategory, List<String> badgeList) {
        log.info("Executing Method filterFoodItems()");

        // Prepare the regex pattern from your Java List<String> badgeList
        String badgeRegex = (badgeList == null || badgeList.isEmpty())
                ? null
                : String.join("|", badgeList);

        List<FoodItem> foodItems = foodItemRepository.filterFoodItems(itemName, itemCategory, badgeRegex);
        List<FoodItemDTO> dtoList = new ArrayList<>();
        for(FoodItem f : foodItems){
            FoodItemDTO dto = new FoodItemDTO();
            dto.setFoodItemId(f.getFoodItemId());
            dto.setFoodItemName(f.getFoodItemName());
            dto.setDescription(f.getDescription());
            dto.setBadges(f.getBadges());
            dto.setPrice(f.getPrice());
            dto.setDiscount(f.getDiscount().getDiscountRate().doubleValue());
            dto.setFoodItemCategory(f.getFoodItemCategory().getCategoryName());
            dto.setImagePath(f.getImagePath());

            dtoList.add(dto);
        }
        return dtoList;
    }
}
