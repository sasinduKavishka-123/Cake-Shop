package lk.ijse.CakeShop.dto.filterDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SupplierFilterDTO {
    private String companyName;
    private String supplierName;
    private String[] supplierStatuses;
}
