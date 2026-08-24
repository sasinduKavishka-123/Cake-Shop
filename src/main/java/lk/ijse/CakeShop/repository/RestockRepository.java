package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.entity.Restock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestockRepository extends JpaRepository<Restock, Long> {

}
