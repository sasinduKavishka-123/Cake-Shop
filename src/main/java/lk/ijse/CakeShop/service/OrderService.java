package lk.ijse.CakeShop.service;

import lk.ijse.CakeShop.dto.PlaceOrderDTO;
import lk.ijse.CakeShop.dto.printDTOs.OrderPrintDTO;
import lk.ijse.CakeShop.enumerations.OrderStatus;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface OrderService {

    void saveOrder(PlaceOrderDTO placeOrderDTO);

    List<PlaceOrderDTO> filterOrders(String orderId, String UserName, String date, Set<String> statusList);

    PlaceOrderDTO getOrderDetailById(long orderId);

    void updateOrderStatus(long orderID, OrderStatus status);

    OrderPrintDTO getOrderById(long orderId);

}
