package lk.ijse.CakeShop.service;

import lk.ijse.CakeShop.dto.StockItemCatDTO;
import lk.ijse.CakeShop.entity.StockItemCategory;

import java.util.List;

public interface StockItemCatService {

    List<StockItemCatDTO> getAllStockItemCategories();

    void saveStockItemCategory(StockItemCatDTO stockItemCatDTO);

    StockItemCatDTO getStockCategoryByName(String name);

}
