package lk.ijse.CakeShop.dto.formDTOs;

import lk.ijse.CakeShop.dto.RestockDetailDTO;
import lk.ijse.CakeShop.dto.StockItemDTO;
import lk.ijse.CakeShop.dto.SupplierDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RestockFormDTO {

    private LocalDate date;
    private BigDecimal total;
    private long supplierID;
    private String supplyCompanyName;

    private List<RestockDetailDTO> restockDetails;

    private List<SupplierDTO> suppliers;
    private List<StockItemDTO> stockItems;

}
