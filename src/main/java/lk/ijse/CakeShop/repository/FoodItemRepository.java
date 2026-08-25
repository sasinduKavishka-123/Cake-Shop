package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.dto.FoodItemDTO;
import lk.ijse.CakeShop.entity.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {

    @Query(value = "SELECT DISTINCT f FROM FoodItem f WHERE " +
            "( (f.foodItemName IS NULL OR f.foodItemName LIKE %?1%) OR " +
            "(f.foodItemCategory.categoryName IS NULL OR f.foodItemCategory.categoryName LIKE %?2%) )" +
            "AND " +
            "(?3 IS NULL OR f.badges IN ?3)")
    List<FoodItem> filterFoodItems(String itemName, String itemCategory, List<String> badges);

}
