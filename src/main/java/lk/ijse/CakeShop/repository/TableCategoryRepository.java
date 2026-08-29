package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.dto.TableCategoryDTO;
import lk.ijse.CakeShop.entity.TableCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TableCategoryRepository extends JpaRepository<TableCategory, Long> {

    @Query(value = "SELECT new lk.ijse.CakeShop.dto.TableCategoryDTO(tc.tableCategoryId, tc.tableCategoryName, tc.pricePerSeat) " +
            "FROM TableCategory tc WHERE (?1 IS NULL OR tc.tableCategoryName LIKE %?1%)")
    List<TableCategoryDTO> filterTableCategories(String categoryName);

    @Query(value = "SELECT tc FROM TableCategory tc " +
            "WHERE tc.tableCategoryName = ?1")
    TableCategory getTableCategoryByName(String name);
}
