package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.StockItemDTO;
import lk.ijse.CakeShop.service.StockItemService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static lk.ijse.CakeShop.constatns.ResponseMessage.SUCCESS_MESSAGE;

@RestController
@RequestMapping(value = "v1/stockItem")
@AllArgsConstructor
public class StockItemController {

    private final StockItemService stockItemService;

    @PostMapping(value = "/saveStockItem")
    public CommonResponse saveStockItem(@RequestBody StockItemDTO stockItemDTO){
        stockItemService.saveStockItem(stockItemDTO);
        return new CommonResponse(200, SUCCESS_MESSAGE);
    }

}
