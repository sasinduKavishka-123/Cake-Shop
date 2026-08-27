package lk.ijse.CakeShop.dto;

import lk.ijse.CakeShop.enumerations.TableStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReservableTableDTO {

    private long tableId;
    private long tableCategoryId;
    private String tableCategoryName;
    private BigDecimal price;
    private int seatCount;
    private TableStatus tableStatus;

}
