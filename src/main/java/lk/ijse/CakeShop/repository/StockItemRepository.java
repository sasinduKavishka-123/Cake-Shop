package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.dto.StockItemDTO;
import lk.ijse.CakeShop.entity.StockItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockItemRepository extends JpaRepository<StockItem, Long> {

    @Query(value = "SELECT si FROM StockItem si WHERE " +
            "( (?1 IS NULL OR si.itemName LIKE %?1%) OR (?2 IS NULL OR si.stockItemCategory.categoryName LIKE %?2%) )" +
            "AND (?3 IS NULL OR str(si.stockStatus) IN ?3)"
    )
    List<StockItem> filterStockItems(String itemName, String itemCategory, String[] itemStatuses);

    @Query(value = "SELECT COUNT(si.stockItemId) FROM StockItem si")
    int getStockItemCount();

    @Query(value = "SELECT new lk.ijse.CakeShop.dto.StockItemDTO(s.stockItemId, s.itemName, s.unitOfMeasure)" +
            "FROM StockItem s")
    List<StockItemDTO> getItemIDAndName();

    @Query(value = "SELECT COUNT(s.stockItemId) FROM StockItem s WHERE s.stockStatus IN ('LOW_STOCK', 'OUT_OF_STOCK')")
    int getLowStockItemCount();
}
