package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.TableCategoryDTO;
import lk.ijse.CakeShop.service.impl.TableCategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static lk.ijse.CakeShop.constatns.ResponseMessage.SUCCESS_MESSAGE;

@RestController
@RequestMapping(value = "v1/tableCategory")
@AllArgsConstructor
public class TableCategoryController {

    private final TableCategoryService tableCategoryService;

    @GetMapping(value = "/filterTableCategories", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse filterTableCategories(
            @RequestParam(value = "table_category_name") String categoryName
    ){
        List<TableCategoryDTO> allTableCategories = tableCategoryService.filterTableCategories(categoryName);
        return new CommonResponse(200, allTableCategories, SUCCESS_MESSAGE);
    }

    @PostMapping(value = "/saveTableCategory", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse saveTableCategory(@RequestBody TableCategoryDTO tableCategoryDTO){
        tableCategoryService.saveTableCategory(tableCategoryDTO);
        return new CommonResponse(200, SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/getTableCategoryDataById/{category_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getTableCategoryDataById(@PathVariable long category_id){
        TableCategoryDTO tableCategory = tableCategoryService.getTableCategoryDataById(category_id);
        return new CommonResponse(200, tableCategory, SUCCESS_MESSAGE);
    }

}
