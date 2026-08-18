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
            "WHERE (u.userEmail=?1 AND u.password=?2 AND u.userRoles=?3)")
    Optional<User> findUser(String email, String password, String userRole);

    @Query(value = "SELECT u FROM User u " +
            "WHERE (?1 IS NULL OR u.userName LIKE %?1%) OR " +
            "(?2 IS NULL OR u.userEmail LIKE %?2%)")
    List<User> getUsers(String name, String email);

    @Query(value = "SELECT COUNT(u.userId) FROM User u WHERE u.userRoles = ?1")
    int getUserCountByRole(String userRole);
 }
