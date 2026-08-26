package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.dto.DiscountDTO;
import lk.ijse.CakeShop.entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Long> {

    @Query(value = "SELECT new lk.ijse.CakeShop.dto.DiscountDTO(d.discount_id, d.discountRate) FROM Discount d")
    List<DiscountDTO> getAllDiscounts();

}
