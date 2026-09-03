package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.FoodItemDTO;
import lk.ijse.CakeShop.service.FoodItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

import static lk.ijse.CakeShop.constatns.ResponseMessage.SUCCESS_MESSAGE;

@RestController
@RequestMapping(value = "v1/foodItems")
@AllArgsConstructor
public class FoodItemController {

    private final FoodItemService foodItemService;

    @PostMapping(value = "/saveFoodItem", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse saveFoodItem(@RequestBody FoodItemDTO foodItemDTO){
        foodItemService.saveFoodItem(foodItemDTO);
        return new CommonResponse(200, SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/filterFoodItems", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse filterFoodItems(
            @RequestParam(value = "item_name") String itemName,
            @RequestParam(value = "item_category") String itemCategory,
            @RequestParam(value = "item_badges", required = false) List<String> itemBadges
    ){
        List<FoodItemDTO> foodItemDTOList = foodItemService.filterFoodItems(itemName, itemCategory, itemBadges);
        return new CommonResponse(200, foodItemDTOList, SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/getFoodItemCount", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getFoodItemCount(){
        return new CommonResponse(200, foodItemService.getFoodItemCount(), SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/getFoodItemFormDate/{food_item_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getFoodItemFormData(@PathVariable long food_item_id){
        return new CommonResponse(200, foodItemService.getFoodItemFormData(food_item_id), SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/getAllFoodItemCategories", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getAllFoodItemCategories(){
        return new CommonResponse(200, foodItemService.getAllFoodItemCategories(), SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/getAllFoodItems", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getAllFoodItems(){
        return new CommonResponse(200, foodItemService.getAllFoodItems(), SUCCESS_MESSAGE);
    }

}
