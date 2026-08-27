package lk.ijse.CakeShop.service.impl;

import lk.ijse.CakeShop.dto.ReservableTableDTO;
import lk.ijse.CakeShop.entity.ReservableTable;
import lk.ijse.CakeShop.entity.TableCategory;
import lk.ijse.CakeShop.enumerations.TableStatus;
import lk.ijse.CakeShop.exception.CustomException;
import lk.ijse.CakeShop.repository.TableCategoryRepository;
import lk.ijse.CakeShop.repository.TableRepository;
import lk.ijse.CakeShop.service.TableService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class TableServiceImpl implements TableService {

    private final TableRepository tableRepository;
    private final TableCategoryRepository tableCategoryRepository;

    @Override
    public void saveTable(ReservableTableDTO reservableTableDTO) {
        log.info("Executing Method saveTable()");

        if(reservableTableDTO.getTableCategoryId() < 1){
            log.error("Error in Method saveTable()");
            throw new CustomException(404, "TABLE CATEGORY NOT FOUND");
        }
        if(reservableTableDTO.getSeatCount() < 1){
            log.error("Error in Method saveTable()");
            throw new CustomException(402, "INVALID SEAT COUNT");
        }

        Optional<TableCategory> optionalTableCategory = tableCategoryRepository.findById(reservableTableDTO.getTableCategoryId());
        if(optionalTableCategory.isEmpty()){
            log.error("Error in Method saveTable()");
            throw new CustomException(404, "TABLE CATEGORY NOT FOUND");
        }
        TableCategory tableCategory = optionalTableCategory.get();

        ReservableTable reservableTable = new ReservableTable();

        if(reservableTableDTO.getTableId() > 0){
            Optional<ReservableTable> optional = tableRepository.findById(reservableTableDTO.getTableId());
            if(optional.isEmpty()){
                log.error("Error in Method saveTable()");
                throw new CustomException(404, "TABLE NOT FOUND");
            }
            reservableTable = optional.get();
        }

        reservableTable.setTableCategory(tableCategory);
        reservableTable.setTableStatus(reservableTableDTO.getTableStatus());
        reservableTable.setSeatCount(reservableTableDTO.getSeatCount());

        tableRepository.save(reservableTable);
    }
}
