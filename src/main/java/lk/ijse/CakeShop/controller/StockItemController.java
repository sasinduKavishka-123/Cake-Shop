package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.StockItemDTO;
import lk.ijse.CakeShop.dto.formDTOs.StockItemFormDTO;
import lk.ijse.CakeShop.service.StockItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

import static lk.ijse.CakeShop.constatns.ResponseMessage.SUCCESS_MESSAGE;

@RestController
@RequestMapping(value = "v1/stockItem")
@AllArgsConstructor
public class StockItemController {

    private final StockItemService stockItemService;

    @PostMapping(value = "/saveStockItem", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse saveStockItem(@RequestBody StockItemDTO stockItemDTO){
        stockItemService.saveStockItem(stockItemDTO);
        return new CommonResponse(200, SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/filterStockItems", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse filterStockItems(
            @RequestParam(value = "item_name") String itemName,
            @RequestParam(value = "category_name") String categoryName,
            @RequestParam(value = "item_statuses", required = false) Set<String> itemStatuses
    ){
        List<StockItemDTO> list = stockItemService.filterStockItems(itemName, categoryName, itemStatuses);
        return new CommonResponse(200, list, SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/getStockItemCount", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getStockItemCount(){
        return new CommonResponse(200, stockItemService.getStockItemCount(), SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/getStockItemFormInfo/{stockItemId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getStockItemFormInfo(@PathVariable long stockItemId){
        StockItemFormDTO formDTO = stockItemService.getStockItemFormInfoByID(stockItemId);
        return new CommonResponse(200, formDTO, SUCCESS_MESSAGE);
    }

}
