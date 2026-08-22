package lk.ijse.CakeShop.service.impl;

import lk.ijse.CakeShop.dto.StockItemCatDTO;
import lk.ijse.CakeShop.dto.StockItemDTO;
import lk.ijse.CakeShop.dto.formDTOs.StockItemFormDTO;
import lk.ijse.CakeShop.entity.StockItem;
import lk.ijse.CakeShop.entity.StockItemCategory;
import lk.ijse.CakeShop.enumerations.StockStatus;
import lk.ijse.CakeShop.exception.CustomException;
import lk.ijse.CakeShop.repository.StockItemCatRepository;
import lk.ijse.CakeShop.repository.StockItemRepository;
import lk.ijse.CakeShop.service.StockItemService;
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
public class StockItemServiceImpl implements StockItemService {

    private final StockItemRepository stockItemRepository;
    private final StockItemCatRepository stockItemCatRepository;

    @Override
    public void saveStockItem(StockItemDTO stockItemDTO) {
        log.info("Executing Method saveStockItem()");

        if(stockItemDTO.getItemName().isEmpty()){
            log.error("Error in Method saveStockItem()");
            throw new CustomException(402, "INVALID ITEM NAME");
        }
        if(stockItemDTO.getStockItemCategoryId()<1){
            log.error("Error in Method saveStockItem()");
            throw new CustomException(402, "CATEGORY ID IS EMPTY");
        }
        if(stockItemDTO.getStockQty() < 0){
            log.error("Error in Method saveStockItem()");
            throw new CustomException(402, "INVALID STOCK QUANTITY");
        }
        if(stockItemDTO.getReorderLevel() < 0){
            log.error("Error in Method saveStockItem()");
            throw new CustomException(402, "INVALID REORDER LEVEL");
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

        StockItemCategory category = new StockItemCategory();
        Optional<StockItemCategory> optionalCat = stockItemCatRepository.findById(stockItemDTO.getStockItemCategoryId());
        if(optionalCat.isEmpty()){
            log.error("Error in Method saveStockItem()");
            throw new CustomException(404, "CATEGORY NOT FOUND");
        }
        category = optionalCat.get();

        StockStatus stockStatus = null;
        if(stockItemDTO.getStockQty() == 0){
            stockStatus = StockStatus.OUT_OF_STOCK;
        }
        else if(stockItemDTO.getStockQty() <= stockItemDTO.getReorderLevel()){
            stockStatus = StockStatus.LOW_STOCK;
        }
        else{
            stockStatus = StockStatus.IN_STOCK;
        }

        stockItem.setItemName(stockItemDTO.getItemName());
        stockItem.setStockQty(stockItemDTO.getStockQty());
        stockItem.setUnitOfMeasure(stockItemDTO.getUnitOfMeasure());
        stockItem.setReorderLevel(stockItemDTO.getReorderLevel());
        stockItem.setStockStatus(stockStatus);
        stockItem.setStockItemCategory(category);

        stockItemRepository.save(stockItem);
    }

    @Override
    public List<StockItemDTO> filterStockItems(String itemName, String categoryName, Set<String> statuses) {
        log.info("Executing Method Beverages()");

        String[] statusList = null;
        if(statuses != null){
            statusList = statuses.toArray(String[]::new);
        }
        List<StockItemDTO> dtoList = new ArrayList<>();
        List<StockItem> list =  stockItemRepository.filterStockItems(itemName, categoryName, statusList);
        for(StockItem i : list){
            StockItemDTO d = new StockItemDTO();
            d.setStockItemId(i.getStockItemId());
            d.setItemName(i.getItemName());
            d.setStockQty(i.getStockQty());
            d.setStockStatus(i.getStockStatus());
            d.setStockItemCategoryName(i.getStockItemCategory().getCategoryName());
            d.setReorderLevel(i.getReorderLevel());
            d.setUnitOfMeasure(i.getUnitOfMeasure());

            dtoList.add(d);
        }
        return dtoList;
    }

    @Override
    public int getStockItemCount() {
        log.info("Executing Method getStockItemCount()");
        return stockItemRepository.getStockItemCount();
    }

    @Override
    public StockItemFormDTO getStockItemFormInfoByID(long id) {
        log.info("Executing Method getStockItemByID()");
        StockItemFormDTO formDTO = new StockItemFormDTO();

        if(id > 0){
            Optional<StockItem> optionalStockItem = stockItemRepository.findById(id);
            if(optionalStockItem.isEmpty()){
                throw new CustomException(404, "ITEM NOT FOUND");
            }
            StockItem i = optionalStockItem.get();
            formDTO.setItemName(i.getItemName());
            formDTO.setStockItemId(i.getStockItemId());
            formDTO.setStockQty(i.getStockQty());
            formDTO.setUnitOfMeasure(i.getUnitOfMeasure());
            formDTO.setReorderLevel(i.getReorderLevel());
            formDTO.setStockStatus(i.getStockStatus());
            formDTO.setStockItemCatDTO(
                    new StockItemCatDTO(i.getStockItemCategory().getCategoryId(),
                                        i.getStockItemCategory().getCategoryName())
            );
        }

        List<StockItemCatDTO> categories = new ArrayList<>();
        List<StockItemCategory> list = stockItemCatRepository.findAll();
        for(StockItemCategory c : list){
            categories.add(new StockItemCatDTO(c.getCategoryId(), c.getCategoryName()));
        }
        formDTO.setCategoryList(categories);

        return formDTO;
    }
}
