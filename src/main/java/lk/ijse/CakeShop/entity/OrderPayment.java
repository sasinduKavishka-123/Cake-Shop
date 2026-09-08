package lk.ijse.CakeShop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Entity
public class OrderPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long paymentId;

    @Column(precision = 10, scale = 2)
    private BigDecimal payAmount;
    @Column(precision = 10, scale = 2)
    private BigDecimal dueAmount;

    private LocalDate payDate;
    private String payType;

    @OneToOne(fetch = FetchType.LAZY)
    private Order order;
}
