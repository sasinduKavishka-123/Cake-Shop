package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.dto.FoodItemDTO;
import lk.ijse.CakeShop.entity.FoodItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {

//    @Query(value = "SELECT DISTINCT f FROM FoodItem f WHERE " +
//            "( (f.foodItemName IS NULL OR f.foodItemName LIKE %?1%) OR " +
//            "(f.foodItemCategory.categoryName IS NULL OR f.foodItemCategory.categoryName LIKE %?2%) )" +
//            "AND " +
//            "(?3 IS NULL OR f.badges IN ?3)")
//    List<FoodItem> filterFoodItems(String itemName, String itemCategory, List<String> badges);

    @Query(value = """
        SELECT DISTINCT f.* FROM food_item f
        LEFT JOIN food_item_category c ON f.category_id = c.category_id
        WHERE ( (:name IS NULL OR f.food_item_name LIKE CONCAT('%', :name, '%'))
        OR (:category IS NULL OR c.category_name LIKE CONCAT('%', :category, '%')) )
        AND (:badgeRegex IS NULL OR f.badges REGEXP :badgeRegex)
    """, nativeQuery = true)
    List<FoodItem> filterFoodItems(@Param("name") String name,
                                   @Param("category") String category,
                                   @Param("badgeRegex") String badgeRegex);


    @Query(value = "SELECT f FROM FoodItem f WHERE f.foodItemName = ?1")
    FoodItem findFoodItemByName(String name);

    @Query(value = "SELECT COUNT(f.foodItemId) FROM FoodItem f")
    int getFoodItemCount();
}
