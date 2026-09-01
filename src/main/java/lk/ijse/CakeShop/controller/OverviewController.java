package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.overviewDTOs.OverviewTableDTO;
import lk.ijse.CakeShop.service.BookingService;
import lk.ijse.CakeShop.service.OrderService;
import lk.ijse.CakeShop.service.StockItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static lk.ijse.CakeShop.constatns.ResponseMessage.SUCCESS_MESSAGE;

@RestController
@RequestMapping(value = "v1/overview")
@AllArgsConstructor
public class OverviewController {

    private final StockItemService stockItemService;
    private final OrderService orderService;
    private final BookingService bookingService;

    @GetMapping(value = "/getOverviewTableData", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getOverviewTableData(){
        OverviewTableDTO overviewTableDTO = new OverviewTableDTO();

        overviewTableDTO.setOrderDTOList(orderService.getLatestOrders());
        overviewTableDTO.setBookingDTOList(bookingService.getThisWeekBookings());
        overviewTableDTO.setStockItemDTOList(stockItemService.getLowStockItems());

        return new CommonResponse(200, overviewTableDTO, SUCCESS_MESSAGE);
    }

}
