package lk.ijse.CakeShop.service;

import lk.ijse.CakeShop.dto.TableCategoryDTO;

import java.util.List;

public interface TableCategoryService {

    List<TableCategoryDTO> filterTableCategories(String categoryName);

    void saveTableCategory(TableCategoryDTO tableCategoryDTO);

    TableCategoryDTO getTableCategoryDataById(long categoryId);

}
