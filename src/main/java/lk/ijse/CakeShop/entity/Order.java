package lk.ijse.CakeShop.entity;

import jakarta.persistence.*;
import lk.ijse.CakeShop.enumerations.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItem;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    private Delivery delivery;

    private LocalDate orderDate;
    private String timeSlot;

    @Column(precision = 10, scale = 2)
    private BigDecimal total;
    @Column(precision = 10, scale = 2)
    private BigDecimal discount;
    @Column(precision = 10, scale = 2)
    private BigDecimal subTotal;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

}
