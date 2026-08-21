package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.entity.StockItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StockItemCatRepository extends JpaRepository<StockItemCategory, Long> {

    @Query(value = "SELECT c FROM StockItemCategory c WHERE c.categoryName = ?1")
    StockItemCategory findStockItemCategoryByName(String name);

}
