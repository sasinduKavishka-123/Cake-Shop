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
    private String password;
    private String userRoles;
    private UserStatus userStatus;
}
