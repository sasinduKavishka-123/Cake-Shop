package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = "SELECT o FROM Order o WHERE " +
            "( (?1 IS NULL OR CAST(o.orderId AS string) LIKE ?1%) OR (?2 IS NULL OR o.user.userName LIKE %?2%) ) " +
            "AND (?3 IS NULL OR CAST(o.orderDate AS string) LIKE ?3%)" +
            "AND ( ?4 IS NULL OR str(o.orderStatus) IN ?4)")
    List<Order> filterOrders(String orderId, String userName, String orderDate, String[] statusList);

    @Query(value = "SELECT COUNT(o.orderId) FROM Order o WHERE o.orderDate BETWEEN ?1 AND ?2")
    int getThisWeekOrderCount(LocalDate startDate, LocalDate endDate);

    @Query(value = "SELECT SUM(o.total) FROM Order o WHERE o.orderDate BETWEEN ?1 AND ?2")
    Double getWeekRevenue(LocalDate startDate, LocalDate endDate);

}
