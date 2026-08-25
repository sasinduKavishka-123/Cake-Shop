package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.entity.FoodItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodItemCategoryRepository extends JpaRepository<FoodItemCategory, Long> {



}
