package lk.ijse.CakeShop.entity;

import jakarta.persistence.*;
import lk.ijse.CakeShop.enumerations.SupplierStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Entity
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long supplierId;

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Restock> restockList;

    private String companyName;
    private String supplierName;
    private String contact;
    private String email;

    @Enumerated(EnumType.STRING)
    private SupplierStatus supplierStatus;
}
