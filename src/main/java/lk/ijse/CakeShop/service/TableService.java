package lk.ijse.CakeShop.service;

import lk.ijse.CakeShop.dto.ReservableTableDTO;

import java.util.List;
import java.util.Set;

public interface TableService {

    void saveTable(ReservableTableDTO reservableTableDTO);

    List<ReservableTableDTO> filterTables(String tableCategory, Set<String> statuses);

}
