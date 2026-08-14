package lk.ijse.CakeShop.service;


import lk.ijse.CakeShop.dto.UserDTO;

public interface UserService {

    void saveUser(UserDTO userDTO);

    int getUserCountByEmail(String email);
}
