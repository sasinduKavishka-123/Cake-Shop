package lk.ijse.CakeShop.service.impl;

import lk.ijse.CakeShop.dto.TableCategoryDTO;
import lk.ijse.CakeShop.entity.TableCategory;
import lk.ijse.CakeShop.exception.CustomException;
import lk.ijse.CakeShop.repository.TableCategoryRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class TableCategoryServiceImpl implements TableCategoryService{

    private final TableCategoryRepository tableCategoryRepository;

    @Override
    public List<TableCategoryDTO> filterTableCategories(String categoryName) {
        log.info("Executing Method getAllTableCategories()");
        return tableCategoryRepository.filterTableCategories(categoryName);
    }

    @Override
    public void saveTableCategory(TableCategoryDTO tableCategoryDTO) {
        log.info("Executing Method saveTableCategory()");

        if(tableCategoryDTO.getTableCategoryName() == null){
            log.info("Error in Method saveTableCategory()");
            throw new CustomException(402, "INVALID CATEGORY NAME");
        }
        if(tableCategoryDTO.getPricePerSeat().doubleValue() < 0){
            log.info("Error in Method saveTableCategory()");
            throw new CustomException(402, "INVALID TABLE PRICE");
        }

        TableCategory tableCategory = new TableCategory();

        if(tableCategoryDTO.getTableCategoryId() > 0){
            Optional<TableCategory> optionalTableCategory = tableCategoryRepository.findById(tableCategoryDTO.getTableCategoryId());
            if(optionalTableCategory.isEmpty()){
                log.info("Error in Method saveTableCategory()");
                throw new CustomException(404, "TABLE CATEGORY NOT FOUND");
            }
            tableCategory = optionalTableCategory.get();
        }

        tableCategory.setTableCategoryName(tableCategoryDTO.getTableCategoryName());
        tableCategory.setPricePerSeat(tableCategoryDTO.getPricePerSeat());

        tableCategoryRepository.save(tableCategory);
    }

    @Override
    public TableCategoryDTO getTableCategoryDataById(long categoryId) {
        log.info("Executing Method getTableCategoryDataById()");

        if(categoryId < 1){
            log.info("Error in Method getTableCategoryDataById()");
            throw new CustomException(402, "INVALID CATEGORY ID");
        }

        Optional<TableCategory> optionalTableCategory = tableCategoryRepository.findById(categoryId);
        if(optionalTableCategory.isEmpty()){
            log.info("Error in Method getTableCategoryDataById()");
            throw new CustomException(404, "TABLE CATEGORY NOT FOUND");
        }

        TableCategory tc = optionalTableCategory.get();

        return new TableCategoryDTO(
                tc.getTableCategoryId(),
                tc.getTableCategoryName(),
                tc.getPricePerSeat()
        );

    }


}
