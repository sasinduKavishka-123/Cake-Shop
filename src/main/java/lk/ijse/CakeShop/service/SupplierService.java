package lk.ijse.CakeShop.service;

import lk.ijse.CakeShop.dto.SupplierDTO;
import lk.ijse.CakeShop.enumerations.SupplierStatus;

import java.util.List;

public interface SupplierService {

    void saveSupplier(SupplierDTO supplierDTO);

    int getSupplierCount();

    SupplierDTO findSupplierByID(long supplierId);

    List<SupplierDTO> filterSuppliers(String companyName, String contactName, String status);
}
