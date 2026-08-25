package lk.ijse.CakeShop.dto.formDTOs;

import lk.ijse.CakeShop.dto.StockItemDTO;
import lk.ijse.CakeShop.dto.SupplierDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RestockFormDTO {

    private List<SupplierDTO> suppliers;
    private List<StockItemDTO> stockItems;

}
