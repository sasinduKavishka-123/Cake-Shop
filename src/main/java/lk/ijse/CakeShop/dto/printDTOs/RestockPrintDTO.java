package lk.ijse.CakeShop.dto.printDTOs;

import lk.ijse.CakeShop.dto.RestockDetailDTO;
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
public class RestockPrintDTO {
    private long restockId;
    private SupplierDTO supplierDTO;
    private LocalDate date;
    private BigDecimal total;
    private int itemCount;
    private List<RestockDetailDTO> restockDetailDTOList;
}
