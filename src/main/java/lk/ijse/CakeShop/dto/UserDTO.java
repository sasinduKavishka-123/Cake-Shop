package lk.ijse.CakeShop.dto;

import lk.ijse.CakeShop.enumerations.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {
    private long userId;
    private String userName;
    private String userEmail;
    private String password;
    private String userRoles;
    private UserStatus userStatus;

    public UserDTO(String userName, String userEmail) {
        this.userName = userName;
        this.userEmail = userEmail;
    }

    public UserDTO(String userEmail, String password, String userRoles) {
        this.userEmail = userEmail;
        this.password = password;
        this.userRoles = userRoles;
    }
}
