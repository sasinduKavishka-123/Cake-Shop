package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.dto.UserDTO;
import lk.ijse.CakeShop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserNameAndPassword(String username, String password);

    Optional<User> findByUserName(String username);

    @Query(value = "SELECT new lk.ijse.CakeShop.dto.UserDTO(u.userName, u.userEmail) FROM User u " +
            "WHERE (?1 IS NULL OR u.userName LIKE %?1%) OR " +
            "(?2 IS NULL OR u.userEmail LIKE %?2%)")
    Optional<UserDTO> getUserByDetails(String username, String email);

    @Query(value = "SELECT u FROM User u " +
            "WHERE (u.userEmail=?1 AND u.userRoles=?2 AND u.userStatus='ACTIVE')")
    Optional<User> findUser(String email, String userRole);

    @Query(value = "SELECT u FROM User u " +
            "WHERE (u.userRoles != 'Customer') AND" +
            " ( (?1 IS NULL OR u.userName LIKE %?1%) OR (?2 IS NULL OR u.userEmail LIKE %?2%))" +
            "AND " +
            "(?3 IS NULL OR str(u.userStatus) IN ?3)"
    )
    List<User> getStaff(String name, String email, String[] status);

    @Query(value = "SELECT u FROM User u " +
            "WHERE (u.userRoles = 'Customer') AND" +
            "( (?1 IS NULL OR u.userName LIKE %?1%) OR (?2 IS NULL OR u.userEmail LIKE %?2%) )" +
            "AND " +
            "(?3 IS NULL OR str(u.userStatus) IN ?3)")
    List<User> getCustomers(String name, String email, String[] status);

    @Query(value = "SELECT COUNT(u.userId) FROM User u WHERE u.userRoles = ?1")
    int getCustomerCount(String userRole);

    @Query(value = "SELECT COUNT(u.userId) FROM User u WHERE u.userRoles != ?1")
    int getStaffCount(String userRole);

 }
