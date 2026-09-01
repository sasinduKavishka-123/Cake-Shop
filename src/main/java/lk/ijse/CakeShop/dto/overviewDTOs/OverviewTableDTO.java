package lk.ijse.CakeShop.dto.overviewDTOs;

import lk.ijse.CakeShop.dto.BookingDTO;
import lk.ijse.CakeShop.dto.PlaceOrderDTO;
import lk.ijse.CakeShop.dto.StockItemDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OverviewTableDTO {

    private List<PlaceOrderDTO> orderDTOList;
    private List<BookingDTO> bookingDTOList;
    private List<StockItemDTO> stockItemDTOList;

}
