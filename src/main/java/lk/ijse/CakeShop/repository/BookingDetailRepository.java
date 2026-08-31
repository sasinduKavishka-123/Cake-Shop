package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.dto.formDTOs.BookingDetailFormDTO;
import lk.ijse.CakeShop.entity.BookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingDetailRepository extends JpaRepository<BookingDetail,Long> {

    @Query(value = "SELECT new lk.ijse.CakeShop.dto.formDTOs.BookingDetailFormDTO" +
            "( bd.reservableTable.tableId, " +
            "  bd.reservableTable.tableCategory.tableCategoryName, " +
            "  bd.reservableTable.seatCount ) " +
            "FROM BookingDetail bd WHERE bd.booking.bookingId = ?1")
    List<BookingDetailFormDTO> getBookingDetailsByBookingId(long bookingId);

}
