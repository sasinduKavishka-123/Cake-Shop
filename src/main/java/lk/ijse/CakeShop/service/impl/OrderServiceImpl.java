package lk.ijse.CakeShop.service.impl;

import lk.ijse.CakeShop.dto.OrderItemsDTO;
import lk.ijse.CakeShop.dto.PlaceOrderDTO;
import lk.ijse.CakeShop.entity.FoodItem;
import lk.ijse.CakeShop.entity.Order;
import lk.ijse.CakeShop.entity.OrderItem;
import lk.ijse.CakeShop.entity.User;
import lk.ijse.CakeShop.enumerations.OrderStatus;
import lk.ijse.CakeShop.exception.CustomException;
import lk.ijse.CakeShop.repository.FoodItemRepository;
import lk.ijse.CakeShop.repository.OrderItemRepository;
import lk.ijse.CakeShop.repository.OrderRepository;
import lk.ijse.CakeShop.repository.UserRepository;
import lk.ijse.CakeShop.service.OrderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final FoodItemRepository foodItemRepository;

    @Override
    public void saveOrder(PlaceOrderDTO placeOrderDTO) {
        log.info("Executing Method saveOrder()");

        // find user ----------------------
        Optional<User> optionalUser = userRepository.findById(placeOrderDTO.getUserId());
        if(optionalUser.isEmpty()){
            log.error("Error in Method saveOrder()");
            throw new CustomException(404, "USER NOT FOUND");
        }
        User user = optionalUser.get();

        // validations -------------------------------
        if(placeOrderDTO.getOrderDate() == null){
            log.error("Error in Method saveOrder()");
            throw new CustomException(402, "INVALID DATE");
        }

        if(placeOrderDTO.getOrderItems().isEmpty()){
            log.error("Error in Method saveOrder()");
            throw new CustomException(404, "ORDER ITEMS NOT FOUND");
        }

        if(placeOrderDTO.getSubTotal().doubleValue() == 0){
            log.error("Error in Method saveOrder()");
            throw new CustomException(402, "INVALID SUB TOTAL");
        }


        Order order = new Order();

        // validate order status ---------------------
        OrderStatus status = OrderStatus.PENDING;

        // save order ----------------------------------
        order.setOrder_date(placeOrderDTO.getOrderDate());
        order.setDiscount(placeOrderDTO.getDiscount());
        order.setSubTotal(placeOrderDTO.getSubTotal());
        order.setTotal(placeOrderDTO.getTotal());
        order.setOrderStatus(status);
        order.setUser(user);

        Order savedOrder = orderRepository.save(order);

        // save order details --------------------------------
        for(OrderItemsDTO oiDTO : placeOrderDTO.getOrderItems()){
            OrderItem oi = new OrderItem();
            // find item -----------------------------
            Optional<FoodItem> optionalFoodItem = foodItemRepository.findById(oiDTO.getFoodItemId());
            if(optionalFoodItem.isEmpty()){
                log.error("Error in Method saveOrder()");
                throw new CustomException(404, "FOOD ITEM NOT FOUND");
            }
            oi.setFoodItem(optionalFoodItem.get());
            oi.setQty(oiDTO.getQty());
            oi.setDiscount(oiDTO.getDiscount());
            oi.setPrice(oiDTO.getPrice());
            oi.setFinalPrice(oiDTO.getFinalPrice());
            oi.setOrder(savedOrder);

            orderItemRepository.save(oi);
        }

    }

}
