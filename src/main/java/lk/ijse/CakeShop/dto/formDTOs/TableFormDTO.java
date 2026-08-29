package lk.ijse.CakeShop.dto.formDTOs;

import lk.ijse.CakeShop.dto.TableCategoryDTO;
import lk.ijse.CakeShop.enumerations.TableStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TableFormDTO {

    private long tableId;
    private long tableCategoryId;
    private String tableCategoryName;
    private BigDecimal price;
    private int seatCount;
    private TableStatus tableStatus;
    private List<TableCategoryDTO> categories;

}
