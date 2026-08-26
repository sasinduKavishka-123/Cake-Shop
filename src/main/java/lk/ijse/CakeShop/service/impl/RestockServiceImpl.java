package lk.ijse.CakeShop.service.impl;

import lk.ijse.CakeShop.dto.RestockDTO;
import lk.ijse.CakeShop.dto.RestockDetailDTO;
import lk.ijse.CakeShop.dto.StockItemDTO;
import lk.ijse.CakeShop.dto.SupplierDTO;
import lk.ijse.CakeShop.dto.formDTOs.RestockFormDTO;
import lk.ijse.CakeShop.entity.Restock;
import lk.ijse.CakeShop.entity.RestockDetail;
import lk.ijse.CakeShop.entity.StockItem;
import lk.ijse.CakeShop.entity.Supplier;
import lk.ijse.CakeShop.exception.CustomException;
import lk.ijse.CakeShop.repository.RestockDetailRepository;
import lk.ijse.CakeShop.repository.RestockRepository;
import lk.ijse.CakeShop.repository.StockItemRepository;
import lk.ijse.CakeShop.repository.SupplierRepository;
import lk.ijse.CakeShop.service.RestockService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class RestockServiceImpl implements RestockService {

    private final RestockRepository restockRepository;
    private final RestockDetailRepository restockDetailRepository;
    private final SupplierRepository supplierRepository;
    private final StockItemRepository stockItemRepository;

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public void saveRestock(RestockDTO restockDTO) {
        log.info("Executing Method saveRestock()");

        if(restockDTO.getSupplierId() <= 0){
            log.error("Error in method saveRestock()");
            throw new CustomException(402, "INVALID SUPPLIER");
        }
        if(restockDTO.getRestockDetailDTOList().isEmpty()){
            log.error("Error in method saveRestock()");
            throw new CustomException(404, "RESTOCK DETAILS EMPTY");
        }

        if(restockDTO.getSupplierId() < 1){
            log.error("Error in method saveRestock()");
            throw new CustomException(402, "INVALID SUPPLIER ID");
        }

        if(restockDTO.getDate() == null){
            log.error("Error in method saveRestock()");
            throw new CustomException(402, "INVALID DATE");
        }

        if(restockDTO.getTotal().doubleValue() < 0){
            log.error("Error in method saveRestock()");
            throw new CustomException(402, "INVALID TOTAL");
        }

        Optional<Supplier> optionalSupplier = supplierRepository.findById(restockDTO.getSupplierId());
        if(optionalSupplier.isEmpty()){
            log.error("Error in method saveRestock()");
            throw new CustomException(404, "SUPPLIER NOT FOUND");
        }

        Supplier supplier = optionalSupplier.get();

        Restock restock = new Restock();

        if(restockDTO.getRestockId() > 0){
            Optional<Restock> optionalRestock = restockRepository.findById(restockDTO.getRestockId());
            if(optionalRestock.isEmpty()){
                log.error("Error in method saveRestock()");
                throw new CustomException(404, "RESTOCK RECORD NOT FOUND");
            }
            restock = optionalRestock.get();
        }

        BigDecimal total = BigDecimal.ZERO;
        int itemCount = 0;
        for(RestockDetailDTO r : restockDTO.getRestockDetailDTOList()){
            BigDecimal val = r.getPricePerUnit().multiply(BigDecimal.valueOf(r.getQty()));
            total = total.add(val);

            // increase item count
            itemCount++;
        }

        restock.setDate(restockDTO.getDate());
        restock.setSupplier(supplier);
        restock.setTotal(restockDTO.getTotal());
        restock.setTotal(total);
        restock.setItemsCount(itemCount);

        Restock savedRestock = restockRepository.save(restock);

        // save restock details -------------------------------------------------
        for(RestockDetailDTO r : restockDTO.getRestockDetailDTOList()){
            RestockDetail rd = new RestockDetail();
            if(r.getRestockId() > 0){
                Optional<RestockDetail> optional = restockDetailRepository.findById(r.getRestockDetailId());
                if(optional.isEmpty()){
                    log.error("Error in method saveRestock()");
                    throw new CustomException(402, "INVALID RESTOCK DETAIL");
                }
                rd = optional.get();
            }

            Optional<StockItem> optionalStockItem = stockItemRepository.findById(r.getStockItemId());
            if(optionalStockItem.isEmpty()){
                log.error("Error in method saveRestock()");
                throw new CustomException(402, "INVALID STOCK ITEM");
            }
            StockItem i = optionalStockItem.get();

            rd.setStockItem(i);
            rd.setPricePerUnit(r.getPricePerUnit());
            rd.setQty(r.getQty());
            rd.setRestock(savedRestock);

            restockDetailRepository.save(rd);
        }

    }

    @Override
    public RestockFormDTO getRestockFormData(long id) {
        log.info("Executing Method getRestockFormData()");
        RestockFormDTO formDTO = new RestockFormDTO();

        List<RestockDetailDTO> restockDetails = new ArrayList<>();
        List<StockItemDTO> items = new ArrayList<>();

        if(id > 0){
            Restock r;
            Optional<Restock> optionalRestock = restockRepository.findById(id);
            if(optionalRestock.isEmpty()){
                log.error("Error in Method getRestockFormData()");
                throw new CustomException(404, "RESTOCK DETAIL NOT FOUND");
            }
            r = optionalRestock.get();

            formDTO.setTotal(r.getTotal());
            formDTO.setDate(r.getDate());
            formDTO.setSupplierID(r.getSupplier().getSupplierId());

            restockDetails = restockDetailRepository.getRestockDetailsByRestockId(id);
        }
        else{
            // get item data
            items = stockItemRepository.getItemIDAndName();
        }

        // get supplier data
        List<SupplierDTO> suppliers = supplierRepository.getSupplierIdAndName();

        formDTO.setSuppliers(suppliers);
        formDTO.setStockItems(items);
        formDTO.setRestockDetails(restockDetails);
        return formDTO;
    }

    @Override
    public List<RestockDTO> filterRestock(String restockId, String supplierName) {
        return restockRepository.filterRestock(restockId, supplierName);
    }

    @Override
    public int getRestockCountForThisMonth() {
        return restockRepository.getThisMonthRestockCount();
    }
}
