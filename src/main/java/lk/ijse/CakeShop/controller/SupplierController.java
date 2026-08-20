package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.SupplierDTO;
import lk.ijse.CakeShop.enumerations.SupplierStatus;
import lk.ijse.CakeShop.service.SupplierService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "v1/supplier")
@AllArgsConstructor
public class SupplierController {

    private final SupplierService supplierService;

    @PostMapping(value = "/saveSupplier", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse saveSupplier(@RequestBody SupplierDTO supplierDTO){
        supplierService.saveSupplier(supplierDTO);
        return new CommonResponse(200, "SUPPLIER SAVED");
    }

    @GetMapping(value = "/getSupplierCount", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getSupplierCount(){
        return new CommonResponse(200, supplierService.getSupplierCount(), "SUCCESS");
    }

    @GetMapping(value = "/findSupplierById/{supplier_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse findSupplierById(@PathVariable long supplier_id){
        SupplierDTO response = supplierService.findSupplierByID(supplier_id);
        return new CommonResponse(200, response, "SUCCESS");
    }

    @GetMapping(value = "/filterSuppliers", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse filterSuppliers(
            @RequestParam(value = "company_name") String companyName,
            @RequestParam(value = "contact_name") String contactName,
            @RequestParam(value = "supplier_status", required = false) String supplierStatus
    ){
        List<SupplierDTO> responseList = supplierService.filterSuppliers(companyName, contactName, supplierStatus);
        return new CommonResponse(200, responseList, "SUCCESS");
    }

}
