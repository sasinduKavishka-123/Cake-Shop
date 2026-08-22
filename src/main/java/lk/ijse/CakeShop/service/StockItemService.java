package lk.ijse.CakeShop.service;

import lk.ijse.CakeShop.dto.StockItemDTO;

import java.util.List;
import java.util.Set;

public interface StockItemService {

    void saveStockItem(StockItemDTO stockItemDTO);

    List<StockItemDTO> filterStockItems(String itemName, String categoryName, Set<String> statuses);
}
