package lk.ijse.CakeShop.controller;

import lk.ijse.CakeShop.constatns.CommonResponse;
import lk.ijse.CakeShop.dto.PlaceOrderDTO;
import lk.ijse.CakeShop.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static lk.ijse.CakeShop.constatns.ResponseMessage.SUCCESS_MESSAGE;

@RestController
@RequestMapping(value = "v1/order")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping(value = "saveOrder", produces = MediaType.APPLICATION_JSON_VALUE)
    public CommonResponse saveOrder(@RequestBody PlaceOrderDTO placeOrderDTO){
        orderService.saveOrder(placeOrderDTO);
        return new CommonResponse(200, SUCCESS_MESSAGE);
    }
}
