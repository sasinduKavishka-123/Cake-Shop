package lk.ijse.CakeShop.service;

import lk.ijse.CakeShop.dto.RestockDTO;
import lk.ijse.CakeShop.dto.formDTOs.RestockFormDTO;
import lk.ijse.CakeShop.dto.printDTOs.RestockPrintDTO;

import java.util.List;

public interface RestockService {

    void saveRestock(RestockDTO restockDTO);

    RestockFormDTO getRestockFormData(long id);

    List<RestockDTO> filterRestock(String restockId, String SupplierName);

    int getRestockCountForThisMonth();

    RestockPrintDTO getRestockById(long restockId);
}
