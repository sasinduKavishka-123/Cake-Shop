package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.dto.SupplierDTO;
import lk.ijse.CakeShop.entity.Supplier;
import lk.ijse.CakeShop.enumerations.SupplierStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    @Query(value = "SELECT COUNT(s.supplierId) FROM Supplier s ")
    int getSupplierCount();

    @Query(value = "SELECT new lk.ijse.CakeShop.dto.SupplierDTO(" +
            "s.supplierId, s.companyName, s.supplierName, s.contact, s.email, s.supplierStatus) " +
            "FROM Supplier s WHERE " +
            "( (?1 IS NULL OR s.companyName LIKE %?1%) OR (?2 IS NULL OR s.supplierName LIKE %?2%) )" +
            " AND " +
            "(?3 IS NULL OR str(s.supplierStatus) IN (?3))")
    List<SupplierDTO> filterSuppliers(String companyName, String contactName, String[] status);

    @Query(value = "SELECT new lk.ijse.CakeShop.dto.SupplierDTO(s.supplierId, s.companyName)" +
            "FROM Supplier s")
    List<SupplierDTO> getSupplierIdAndName();
}
