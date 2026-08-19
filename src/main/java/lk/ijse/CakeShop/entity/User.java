package lk.ijse.CakeShop.entity;

import jakarta.persistence.*;
import lk.ijse.CakeShop.enumerations.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;
    private String userName;
    private String userEmail;
    private String userContact;
    private String password;
    private String userRoles;

    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;
}
