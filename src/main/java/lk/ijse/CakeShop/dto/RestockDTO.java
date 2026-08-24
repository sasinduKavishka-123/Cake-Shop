package lk.ijse.CakeShop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RestockDTO {

    private long        restockId;
    private long        supplierId;
    private LocalDate   date;
    private BigDecimal  total;

    private List<RestockDetailDTO> restockDetailDTOList;

    public RestockDTO(long restockId, long supplierId, LocalDate date, List<RestockDetailDTO> restockDetailDTOList) {
        this.restockId = restockId;
        this.supplierId = supplierId;
        this.date = date;
        this.restockDetailDTOList = restockDetailDTOList;
    }
}
