package lk.ijse.CakeShop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Entity
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long discount_id;

    @Column(precision = 3, scale = 2)
    private BigDecimal discountRate;

    @OneToMany(mappedBy = "discount", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<FoodItem> foodItem;
}
