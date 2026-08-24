package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.entity.RestockDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestockDetailRepository extends JpaRepository<RestockDetail, Long> {
}
