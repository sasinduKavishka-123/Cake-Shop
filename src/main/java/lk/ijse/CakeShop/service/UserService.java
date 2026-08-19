package lk.ijse.CakeShop.service;


import lk.ijse.CakeShop.dto.UserDTO;
import lk.ijse.CakeShop.enumerations.UserStatus;

import java.util.List;

public interface UserService {

    void saveUser(UserDTO userDTO);

    UserDTO findUser(String email, String password, String userRole);

    List<UserDTO> getUsers(String name, String email, boolean isStaff);

    int getUserCountByRole(String userRole, boolean isStaff);

    UserDTO findUserById(long id);

    void updateUserStatus(long id, UserStatus userStatus);

}
