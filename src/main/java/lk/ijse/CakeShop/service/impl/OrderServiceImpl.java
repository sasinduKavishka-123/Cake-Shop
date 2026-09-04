package lk.ijse.CakeShop.service.impl;

import lk.ijse.CakeShop.dto.OrderItemsDTO;
import lk.ijse.CakeShop.dto.PlaceOrderDTO;
import lk.ijse.CakeShop.dto.UserDTO;
import lk.ijse.CakeShop.dto.overviewDTOs.OrderOverviewDTO;
import lk.ijse.CakeShop.dto.printDTOs.OrderPrintDTO;
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
import lombok.val;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final FoodItemRepository foodItemRepository;

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
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
        order.setOrderDate(placeOrderDTO.getOrderDate());
        order.setTimeSlot(placeOrderDTO.getTimeSlot());
        order.setDiscount(placeOrderDTO.getDiscount());
        order.setSubTotal(placeOrderDTO.getSubTotal());
        order.setTotal(placeOrderDTO.getTotal());
        order.setOrderStatus(status);
        order.setUser(user);

        if(placeOrderDTO.getOrderNote() == null){
            order.setOrderNote("None");
        }else{
            order.setOrderNote(placeOrderDTO.getOrderNote());
        }

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

    @Override
    public List<PlaceOrderDTO> filterOrders(String orderId, String userName, String date, Set<String> statuses) {
        log.info("Executing Method filterOrders()");

        String[] statusList = null;
        if(statuses != null){
            statusList = statuses.toArray(String[]::new);
        }

        List<PlaceOrderDTO> orderDTOS = new ArrayList<>();
        List<Order> orders = orderRepository.filterOrders(orderId, userName, date, statusList);

        for(Order o : orders){
            PlaceOrderDTO p = new PlaceOrderDTO();
            p.setOrderId(o.getOrderId());
            p.setOrderStatus(o.getOrderStatus());
            p.setTotal(o.getTotal());
            p.setUserName(o.getUser().getUserName());
            p.setOrderDate(o.getOrderDate());
            p.setTimeSlot(o.getTimeSlot());

            // fill order items ---------------
            List<OrderItemsDTO> itemList = new ArrayList<>();
            for(OrderItem oi : o.getOrderItem()){
                OrderItemsDTO dto = new OrderItemsDTO();
                dto.setFoodItemName(oi.getFoodItem().getFoodItemName());
                dto.setQty(oi.getQty());

                itemList.add(dto);
            }
            p.setOrderItems(itemList);

            orderDTOS.add(p);
        }

        return orderDTOS;
    }

    @Override
    public PlaceOrderDTO getOrderDetailById(long orderId) {
        log.info("Executing Method getOrderDetailById()");

        if(orderId < 1){
            log.error("Error in Method getOrderDetailById()");
            throw new CustomException(402, "INVALID ORDER ID");
        }

        val optionalOrder = orderRepository.findById(orderId);
        if(optionalOrder.isEmpty()){
            log.error("Error in Method getOrderDetailById()");
            throw new CustomException(404, "ORDER NOT FOUND");
        }

        PlaceOrderDTO placeOrderDTO = new PlaceOrderDTO();
        Order o = optionalOrder.get();

        placeOrderDTO.setOrderId(o.getOrderId());
        placeOrderDTO.setOrderStatus(o.getOrderStatus());
        placeOrderDTO.setSubTotal(o.getSubTotal());
        placeOrderDTO.setDiscount(o.getDiscount());
        placeOrderDTO.setTotal(o.getTotal());
        placeOrderDTO.setOrderDate(o.getOrderDate());
        placeOrderDTO.setTimeSlot(o.getTimeSlot());
        placeOrderDTO.setOrderNote(o.getOrderNote());

        // user details -----------------------
        UserDTO userDTO = new UserDTO();
        userDTO.setUserName(o.getUser().getUserName());
        userDTO.setUserContact(o.getUser().getUserContact());
        userDTO.setUserEmail(o.getUser().getUserEmail());
        placeOrderDTO.setUser(userDTO);

        // order item details --------------------------
        List<OrderItemsDTO> itemList = new ArrayList<>();
        for(OrderItem oi : o.getOrderItem()){
            OrderItemsDTO dto = new OrderItemsDTO();
            dto.setDiscount(oi.getDiscount());
            dto.setPrice(oi.getPrice());
            dto.setFinalPrice(oi.getFinalPrice());
            dto.setFoodItemName(oi.getFoodItem().getFoodItemName());
            dto.setQty(oi.getQty());

            itemList.add(dto);
        }
        placeOrderDTO.setOrderItems(itemList);

        return placeOrderDTO;
    }

    @Override
    public void updateOrderStatus(long orderID, OrderStatus status) {
        log.info("Executing Method updateOrderStatus()");

        Optional<Order> optionalOrder = orderRepository.findById(orderID);
        if(optionalOrder.isEmpty()){
            log.error("Error in Method updateOrderStatus()");
            throw new CustomException(404, "Order Not Found");
        }
        Order order = optionalOrder.get();
        order.setOrderStatus(status);

        orderRepository.save(order);

    }

    @Override
    public OrderPrintDTO getOrderById(long orderId) {
        log.info("Executing Method getOrderById()");

        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if(optionalOrder.isEmpty()){
            log.error("Error in Method getOrderById()");
            throw new CustomException(404, "Order not Found");
        }
        Order o = optionalOrder.get();
        OrderPrintDTO orderPrintDTO = new OrderPrintDTO();

        orderPrintDTO.setOrderId(o.getOrderId());
        orderPrintDTO.setOrderDate(o.getOrderDate());
        orderPrintDTO.setTimeSlot(o.getTimeSlot());
        orderPrintDTO.setTotal(o.getTotal());
        orderPrintDTO.setDiscount(o.getDiscount());
        orderPrintDTO.setSubTotal(o.getSubTotal());
        orderPrintDTO.setDiscount(o.getDiscount());
        orderPrintDTO.setOrderStatus(o.getOrderStatus());
        orderPrintDTO.setOrderNote(o.getOrderNote());

        // get Customer data
        UserDTO user = new UserDTO();
        user.setUserRoles(o.getUser().getUserRoles());
        user.setUserName(o.getUser().getUserName());
        user.setUserContact(o.getUser().getUserContact());
        user.setUserEmail(o.getUser().getUserEmail());

        orderPrintDTO.setUser(user);

        // get order details
        List<OrderItemsDTO> orderItemsDTOList = new ArrayList<>();
        for(OrderItem oi : o.getOrderItem()){
            OrderItemsDTO dto = new OrderItemsDTO();
            dto.setFoodItemName(oi.getFoodItem().getFoodItemName());
            dto.setQty(oi.getQty());
            dto.setPrice(oi.getPrice());
            dto.setDiscount(oi.getDiscount());
            dto.setFinalPrice(oi.getFinalPrice());

            orderItemsDTOList.add(dto);
        }
        orderPrintDTO.setOrderItems(orderItemsDTOList);

        return orderPrintDTO;

    }

    @Override
    public int getThisWeekOrderCount() {
        log.info("Executing Method getThisWeekOrderCount()");

        LocalDate startDate = LocalDate.now().minusDays(7); // seven days ago
        LocalDate endDate = LocalDate.now();

        return orderRepository.getThisWeekOrderCount(startDate, endDate);
    }

    @Override
    public OrderOverviewDTO getOrderWeekRevenues() {
        log.info("Executing Method getOrderWeekRevenues()");

        OrderOverviewDTO orderOverviewDTO = new OrderOverviewDTO();
        double thisWeekRevenue = 0.0;
        double lastWeekRevenue = 1;

        // get this week revenue
        LocalDate today = LocalDate.now();
        LocalDate thisWeekStart = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        Double weekRevenue = orderRepository.getWeekRevenue(thisWeekStart, today);
        if(weekRevenue != null){
            thisWeekRevenue = weekRevenue;
        }
        orderOverviewDTO.setThisWeekRevenue(new BigDecimal(thisWeekRevenue));

        // get last week revenue
        LocalDate lastWeekStart = today.minusWeeks(1)
                .with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));

        LocalDate lastWeekEnd = today.minusWeeks(1)
                .with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
        weekRevenue = orderRepository.getWeekRevenue(lastWeekStart, lastWeekEnd);
        if(weekRevenue != null){
            lastWeekRevenue = weekRevenue;
        }
        orderOverviewDTO.setLastWeekRevenue(new BigDecimal(lastWeekRevenue));

        // calculate percentage
        double percentage = ((thisWeekRevenue - lastWeekRevenue) / lastWeekRevenue) * 100;
        orderOverviewDTO.setPercentage(percentage);

        return orderOverviewDTO;
    }

    @Override
    public List<PlaceOrderDTO> getLatestOrders() {
        List<Order> latestOrders = orderRepository.getLatestOrders();
        List<PlaceOrderDTO> orderDTOList = new ArrayList<>();
        for(Order o : latestOrders){
            PlaceOrderDTO dto = new PlaceOrderDTO();
            dto.setOrderId(o.getOrderId());
            dto.setUserName(o.getUser().getUserName());
            dto.setTotal(o.getTotal());
            dto.setOrderStatus(o.getOrderStatus());
            dto.setOrderDate(o.getOrderDate());
            dto.setTimeSlot(o.getTimeSlot());

            orderDTOList.add(dto);
        }
        return orderDTOList;
    }

}
