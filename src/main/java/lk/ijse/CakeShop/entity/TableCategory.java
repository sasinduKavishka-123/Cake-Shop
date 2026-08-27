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
public class TableCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tableCategoryId;
    private String tableCategoryName;
    private BigDecimal pricePerSeat;

    @OneToMany(mappedBy = "tableCategory", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ReservableTable> reservableTables;
}
