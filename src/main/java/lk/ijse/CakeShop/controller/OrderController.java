package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.PlaceOrderDTO;
import lk.ijse.CakeShop.enumerations.OrderStatus;
import lk.ijse.CakeShop.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ConcurrentModificationException;
import java.util.List;
import java.util.Set;

import static lk.ijse.CakeShop.constatns.ResponseMessage.SUCCESS_MESSAGE;

@RestController
@RequestMapping(value = "v1/order")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping(value = "/saveOrder", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse saveOrder(@RequestBody PlaceOrderDTO placeOrderDTO){
        orderService.saveOrder(placeOrderDTO);
        return new CommonResponse(200, SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/filterOrders", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse filterOrders(
            @RequestParam (value = "order_id", required = false) String orderId,
            @RequestParam (value = "user_name", required = false) String userName,
            @RequestParam (value = "order_date", required = false) String orderDate,
            @RequestParam (value = "status_list", required = false) Set<String> statusList
    ){
        List<PlaceOrderDTO> orderDTOList = orderService.filterOrders(orderId, userName, orderDate, statusList);
        return new CommonResponse(200, orderDTOList, SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/getOrderFormDetail/{order_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getOrderDetailById(@PathVariable long order_id){
        PlaceOrderDTO orderDTO = orderService.getOrderDetailById(order_id);
        return new CommonResponse(200, orderDTO, SUCCESS_MESSAGE);
    }

    @PatchMapping(value = "/updateOrderStatus", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse updateOrderStatus(
            @RequestParam(value = "order_id") long orderId,
            @RequestParam(value = "order_status") OrderStatus orderStatus
    ){
        orderService.updateOrderStatus(orderId, orderStatus);
        return new CommonResponse(200, SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/getOrderById/{order_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getOrderById(@PathVariable long order_id){
        return new CommonResponse(200, orderService.getOrderById(order_id), SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/getThisWeekOrderCount", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getThisWeekOrderCount(){
        return new CommonResponse(200, orderService.getThisWeekOrderCount(), SUCCESS_MESSAGE);
    }

    @GetMapping(value = "/getOrderWeekRevenues", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse getOrderWeekRevenues(){
        return new CommonResponse(200, orderService.getOrderWeekRevenues(), SUCCESS_MESSAGE);
    }

}
