package lk.ijse.CakeShop.entity;

import jakarta.persistence.*;
import lk.ijse.CakeShop.enumerations.TableStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Entity
public class ReservableTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tableId;
    private int seatCount;

    @Enumerated(EnumType.STRING)
    private TableStatus tableStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "table_category_id")
    private TableCategory tableCategory;

    @OneToMany(mappedBy = "reservableTable", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BookingDetail> bookingDetails;
}
