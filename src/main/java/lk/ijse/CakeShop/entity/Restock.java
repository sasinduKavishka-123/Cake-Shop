package lk.ijse.CakeShop.entity;

import jakarta.persistence.*;
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
public class Restock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long restockId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    @OneToMany(mappedBy = "restock", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RestockDetail> restockDetails;

    private LocalDate date;
    private BigDecimal total;
}
