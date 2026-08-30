package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.entity.Booking;
import lk.ijse.CakeShop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query(value = "SELECT b FROM Booking b WHERE " +
            "( (?1 IS NULL OR CAST(b.bookingId AS string) LIKE ?1%) OR (?2 IS NULL OR b.user.userName LIKE %?2%) )" +
            " AND " +
            "(?3 IS NULL OR CAST(b.bookingDate AS string ) LIKE ?3%)" +
            " AND " +
            "(?4 IS NULL OR str(b.bookingStatus) IN ?4)")
    List<Booking> filterBookings(String bookingId, String userName, String date, String[] statuses);

    String user(User user);
}
