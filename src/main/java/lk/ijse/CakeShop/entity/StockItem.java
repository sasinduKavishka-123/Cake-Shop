package lk.ijse.CakeShop.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lk.ijse.CakeShop.enumerations.StockStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Entity
public class StockItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long stockItemId;

    private String itemName;
    @Column(nullable = false)
    @PositiveOrZero
    private Integer stockQty;
    private String unitOfMeasure;
    @Column(nullable = false)
    @PositiveOrZero
    private Integer reorderLevel;

    @Enumerated(EnumType.STRING)
    private StockStatus stockStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_item_category_id")
    private StockItemCategory stockItemCategory;

    @OneToMany(mappedBy = "stockItem", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RestockDetail> restockDetails;
}
