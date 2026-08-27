package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.entity.ReservableTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TableRepository extends JpaRepository<ReservableTable, Long> {

}
