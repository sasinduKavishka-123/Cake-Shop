package lk.ijse.CakeShop.dto;

import lk.ijse.CakeShop.enumerations.SupplierStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SupplierDTO {

    private long   supplierId;
    private String companyName;
    private String supplierName;
    private String contact;
    private String email;
    private SupplierStatus supplierStatus;
}
