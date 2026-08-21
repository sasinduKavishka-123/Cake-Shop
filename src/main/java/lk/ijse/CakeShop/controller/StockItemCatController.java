package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.StockItemCatDTO;
import lk.ijse.CakeShop.service.StockItemCatService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static lk.ijse.CakeShop.constatns.ResponseMessage.SUCCESS_MESSAGE;

@RestController
@RequestMapping(value = "v1/stockItemCat")
@AllArgsConstructor
public class StockItemCatController {

    private final StockItemCatService stockItemCatService;

    @PostMapping(value = "/saveStockItemCategory", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse saveStockItemCategory(@RequestBody StockItemCatDTO stockItemCatDTO){
        stockItemCatService.saveStockItemCategory(stockItemCatDTO);
        return new CommonResponse(200, SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/getAllStockItemCategories", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getAllStockItemCategories(){
        List<StockItemCatDTO> list = stockItemCatService.getAllStockItemCategories();
        return new CommonResponse(200, list, SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/getStockItemCategoryByName", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getStockItemCategoryByName(
            @RequestParam (value = "category_name") String categoryName
    ){
        StockItemCatDTO dto = stockItemCatService.getStockCategoryByName(categoryName);
        return new CommonResponse(200, dto, SUCCESS_MESSAGE);
    }

}
