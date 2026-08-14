package lk.ijse.CakeShop.repository;

import lk.ijse.CakeShop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserNameAndPassword(String username, String password);

    Optional<User> findByUserName(String username);

    @Query(value = "SELECT count(u.userEmail) FROM User u " +
            "WHERE (?1 IS NULL OR u.userEmail LIKE %?1%)")
    int getUserCountByEmail(String email);

 }
