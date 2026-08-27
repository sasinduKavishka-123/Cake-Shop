package lk.ijse.CakeShop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Entity
public class ReservableTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tableId;
    private BigDecimal price;
    private int seatCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "table_category_id")
    private TableCategory tableCategory;
}
