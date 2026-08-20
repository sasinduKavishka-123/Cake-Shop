package lk.ijse.CakeShop.service.impl;

import lk.ijse.CakeShop.dto.SupplierDTO;
import lk.ijse.CakeShop.entity.Supplier;
import lk.ijse.CakeShop.enumerations.SupplierStatus;
import lk.ijse.CakeShop.exception.CustomException;
import lk.ijse.CakeShop.repository.SupplierRepository;
import lk.ijse.CakeShop.service.SupplierService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;

    @Override
    public void saveSupplier(SupplierDTO supplierDTO) {
        log.info("Executing method saveSupplier()");

        if(supplierDTO.getSupplierName().length() < 2){
            log.error("Error in method saveSupplier()");
            throw new CustomException(403 ,"INVALID_SUPPLIER_NAME");
        }
        if(supplierDTO.getCompanyName().length() < 2){
            log.error("Error in method saveSupplier()");
            throw new CustomException(403 ,"INVALID_COMPANY_NAME");
        }
        if(supplierDTO.getContact().isEmpty() || supplierDTO.getEmail().isEmpty()){
            log.error("Error in method saveSupplier()");
            throw new CustomException(403 ,"INVALID_SUPPLIER_CONTACT");
        }

        Supplier supplier = new Supplier();
        if(supplierDTO.getSupplierId() > 0){
            Optional<Supplier> optionalSupplier = supplierRepository.findById(supplierDTO.getSupplierId());

            if(optionalSupplier.isEmpty()){
                log.error("Error in method saveSupplier()");
                throw new CustomException(404 ,"SUPPLIER_NOT_FOUND");
            }
            supplier = optionalSupplier.get();
        }

        supplier.setCompanyName(supplierDTO.getCompanyName());
        supplier.setSupplierName(supplierDTO.getSupplierName());
        supplier.setContact(supplierDTO.getContact());
        supplier.setEmail(supplierDTO.getEmail());
        supplier.setSupplierStatus(supplierDTO.getSupplierStatus());

        supplierRepository.save(supplier);
        log.info("Supplier Saved");
    }

    @Override
    public int getSupplierCount() {
        return supplierRepository.getActiveSupplierCount();
    }

    @Override
    public SupplierDTO findSupplierByID(long supplierId) {
        log.info("Execute Method findSupplierByID()");

        if(supplierId < 1){
            log.error("Error in method findSupplierByID()");
            throw new CustomException(402, "INVALID SUPPLIER ID");
        }

        Optional<Supplier> optionalSupplier = supplierRepository.findById(supplierId);
        if(optionalSupplier.isEmpty()){
            log.error("Error in method findSupplierByID()");
            throw new CustomException(404, "SUPPLIER NOT FOUND");
        }

        Supplier s = optionalSupplier.get();
        SupplierDTO supplierDTO = new SupplierDTO();
        supplierDTO.setSupplierId(s.getSupplierId());
        supplierDTO.setCompanyName(s.getCompanyName());
        supplierDTO.setSupplierName(s.getSupplierName());
        supplierDTO.setContact(s.getContact());
        supplierDTO.setEmail(s.getEmail());
        supplierDTO.setSupplierStatus(s.getSupplierStatus());

        return supplierDTO;
    }

    @Override
    public List<SupplierDTO> filterSuppliers(String companyName, String contactName, String status) {
        log.info("Execute Method filterSuppliers()");

        return supplierRepository.filterSuppliers(companyName, contactName, status);
    }

}
