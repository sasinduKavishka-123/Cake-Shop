package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.dto.FoodItemCategoryDTO;
import lk.ijse.CakeShop.entity.FoodItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodItemCategoryRepository extends JpaRepository<FoodItemCategory, Long> {

    @Query(value = "SELECT new lk.ijse.CakeShop.dto.FoodItemCategoryDTO(f.categoryId, f.categoryName) FROM FoodItemCategory f")
    List<FoodItemCategoryDTO> getAllCategories();

}
