package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.entity.ReservableTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservableTableRepository extends JpaRepository<ReservableTable, Long> {

    @Query(value = "SELECT t FROM ReservableTable t WHERE " +
            "(?1 IS NULL OR t.tableCategory.tableCategoryName LIKE %?1%) AND " +
            "(?2 IS NULL OR str(t.tableStatus) IN ?2)")
    List<ReservableTable> filterTables(String tableCategory, String[] statuses);

}
