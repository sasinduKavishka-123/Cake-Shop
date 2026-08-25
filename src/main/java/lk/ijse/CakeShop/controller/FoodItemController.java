package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.FoodItemDTO;
import lk.ijse.CakeShop.service.FoodItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static lk.ijse.CakeShop.constatns.ResponseMessage.SUCCESS_MESSAGE;

@RestController
@RequestMapping(value = "v1/foodItem")
@AllArgsConstructor
public class FoodItemController {

    private final FoodItemService foodItemService;

    @PostMapping(value = "/saveFoodItem", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse saveFoodItem(@RequestBody FoodItemDTO foodItemDTO){
        foodItemService.saveFoodItem(foodItemDTO);
        return new CommonResponse(200, SUCCESS_MESSAGE);
    }

}
