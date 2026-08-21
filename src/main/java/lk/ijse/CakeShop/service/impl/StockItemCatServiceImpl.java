package lk.ijse.CakeShop.service.impl;

import lk.ijse.CakeShop.dto.StockItemCatDTO;
import lk.ijse.CakeShop.dto.StockItemDTO;
import lk.ijse.CakeShop.entity.StockItemCategory;
import lk.ijse.CakeShop.exception.CustomException;
import lk.ijse.CakeShop.repository.StockItemCatRepository;
import lk.ijse.CakeShop.service.StockItemCatService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class StockItemCatServiceImpl implements StockItemCatService{

    private final StockItemCatRepository stockItemCatRepository;

    @Override
    public List<StockItemCatDTO> getAllStockItemCategories() {
        log.info("Executing Method getAllStockItemCategories()");
        List<StockItemCatDTO> list = new ArrayList<>();

        List<StockItemCategory> categoryList = stockItemCatRepository.findAll();
        for(StockItemCategory c : categoryList){
            StockItemCatDTO dto  = new StockItemCatDTO(c.getCategoryId(), c.getCategoryName());
            list.add(dto);
        }

        return list;
    }

    @Override
    public void saveStockItemCategory(StockItemCatDTO stockItemCatDTO) {
        log.info("Executing Method saveStockItemCategory()");

        if(stockItemCatDTO.getCategoryName().isEmpty()){
            log.error("Error in method saveStockItemCategory()");
            throw new CustomException(402, "CATEGORY NAME IS EMPTY");
        }

        StockItemCategory stockItemCategory = new StockItemCategory();

        if(stockItemCatDTO.getCategoryId() > 0){
            Optional<StockItemCategory> byId = stockItemCatRepository.findById(stockItemCatDTO.getCategoryId());
            if(byId.isEmpty()){
                log.error("Error in method saveStockItemCategory()");
                throw new CustomException(404, "CATEGORY NAME NOT FOUND");
            }
            stockItemCategory = byId.get();
        }

        stockItemCategory.setCategoryName(stockItemCatDTO.getCategoryName());
        stockItemCatRepository.save(stockItemCategory);
    }

    @Override
    public StockItemCatDTO getStockCategoryByName(String name) {
        log.info("Executing Method getStockCategoryByName()");

        if(name.isEmpty()){
            log.error("Error in method getStockCategoryByName()");
            throw new CustomException(402, "CATEGORY NAME IS EMPTY");
        }

        StockItemCategory itemCategory = stockItemCatRepository.findStockItemCategoryByName(name);
        StockItemCatDTO dto = new StockItemCatDTO(itemCategory.getCategoryId(), itemCategory.getCategoryName());
        return dto;
    }

}
