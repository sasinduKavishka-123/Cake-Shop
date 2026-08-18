package lk.ijse.CakeShop.service;


import lk.ijse.CakeShop.dto.UserDTO;

import java.util.List;

public interface UserService {

    void saveUser(UserDTO userDTO);

    UserDTO findUser(String email, String password, String userRole);

    List<UserDTO> getUsers(String name, String email);

    int getUserCountByRole(String userRole);

    UserDTO findUserById(long id);

}
