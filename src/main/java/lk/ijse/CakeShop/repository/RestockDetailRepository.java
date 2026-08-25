package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.dto.RestockDetailDTO;
import lk.ijse.CakeShop.entity.RestockDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestockDetailRepository extends JpaRepository<RestockDetail, Long> {

    @Query(value = "SELECT new lk.ijse.CakeShop.dto.RestockDetailDTO(rd.stockItem.itemName,rd.pricePerUnit, rd.qty, rd.stockItem.unitOfMeasure)" +
            "FROM RestockDetail rd WHERE rd.restock.restockId = ?1")
    List<RestockDetailDTO> getRestockDetailsByRestockId(long id);

}
