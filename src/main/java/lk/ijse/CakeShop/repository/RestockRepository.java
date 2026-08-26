package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.dto.RestockDTO;
import lk.ijse.CakeShop.entity.Restock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestockRepository extends JpaRepository<Restock, Long> {

    // Filter restock data in descending order
    @Query(value = "SELECT new lk.ijse.CakeShop.dto.RestockDTO(r.restockId, r.supplier.supplierName, r.date, r.total, r.itemsCount)" +
            " FROM Restock r WHERE " +
            "(?1 IS NULL OR CAST(r.restockId AS string ) LIKE %?1%) OR " +
            "(?2 IS NULL OR r.supplier.supplierName LIKE %?2%)" +
            "ORDER BY r.restockId DESC")
    List<RestockDTO> filterRestock(String restockId, String SupplierName);

    @Query(value = "SELECT COUNT(r.restockId) FROM Restock r WHERE " +
            "MONTH(r.date) = MONTH(CURRENT_DATE) AND " +
            "YEAR(r.date) = YEAR(CURRENT_DATE)")
    int getThisMonthRestockCount();
}
