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
public class RestockDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long restockDetailId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restock_id")
    private Restock restock;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_item_id")
    private StockItem stockItem;

    private int qty;
    private BigDecimal pricePerUnit;
}
