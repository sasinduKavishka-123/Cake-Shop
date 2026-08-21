package lk.ijse.CakeShop.service.impl;

import lk.ijse.CakeShop.dto.StockItemDTO;
import lk.ijse.CakeShop.entity.StockItem;
import lk.ijse.CakeShop.exception.CustomException;
import lk.ijse.CakeShop.repository.StockItemRepository;
import lk.ijse.CakeShop.service.StockItemService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class StockItemServiceImpl implements StockItemService {

    private final StockItemRepository stockItemRepository;


    @Override
    public void saveStockItem(StockItemDTO stockItemDTO) {
        log.info("Executing Method saveStockItem()");

        if(stockItemDTO.getItemName().isEmpty()){
            log.error("Error in Method saveStockItem()");
            throw new CustomException(402, "INVALID ITEM NAME");
        }
        if(stockItemDTO.getStockItemCategoryName().isEmpty()){
            log.error("Error in Method saveStockItem()");
            throw new CustomException(402, "CATEGORY IS EMPTY");
        }

        StockItem stockItem = new StockItem();
        if(stockItemDTO.getStockItemId() > 0){
            Optional<StockItem> optionalStockItem = stockItemRepository.findById(stockItemDTO.getStockItemId());
            if(optionalStockItem.isEmpty()){
                log.error("Error in Method saveStockItem()");
                throw new CustomException(404, "ITEM NOT FOUND");
            }
            stockItem = optionalStockItem.get();
        }


    }
}
