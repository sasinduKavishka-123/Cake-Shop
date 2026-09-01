package lk.ijse.CakeShop.dto.overviewDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderOverviewDTO {

    private BigDecimal thisWeekRevenue;
    private BigDecimal lastWeekRevenue;
    private double percentage;

}
