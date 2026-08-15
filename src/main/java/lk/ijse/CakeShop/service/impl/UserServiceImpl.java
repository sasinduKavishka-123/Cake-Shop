package lk.ijse.CakeShop.service.impl;

import lk.ijse.CakeShop.dto.UserDTO;
import lk.ijse.CakeShop.entity.User;
import lk.ijse.CakeShop.enumerations.UserStatus;
import lk.ijse.CakeShop.exception.CustomException;
import lk.ijse.CakeShop.repository.UserRepository;
import lk.ijse.CakeShop.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor

public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public void saveUser(UserDTO userDTO) {
        log.info("Execute method saveUser()");
        Optional<UserDTO> optionalUserDTO = userRepository.getUserByDetails(userDTO.getUserName(), userDTO.getUserEmail());

        if(optionalUserDTO.isPresent()){

            UserDTO responseDTO = optionalUserDTO.get();

            if (userDTO.getUserName().equals(responseDTO.getUserName())) {
                throw new CustomException(401, "USERNAME_ALREADY_EXIST");
            }
            if (userDTO.getUserEmail().equals(responseDTO.getUserEmail())) {
                throw new CustomException(402, "EMAIL_ALREADY_EXIST");
            }
        }

        User user = new User();
        user.setUserName(userDTO.getUserName());
        user.setUserEmail(userDTO.getUserEmail());
        user.setUserRoles(userDTO.getUserRoles());
        user.setPassword(userDTO.getPassword());
        user.setUserStatus(UserStatus.ACTIVE);

        userRepository.save(user);

    }

    @Override
    public UserDTO findUser(String email, String password, String userRole) {
        log.info("Execute method findUser()");

        Optional<User> optionalUser = userRepository.findUser(email, password, userRole);
        if (optionalUser.isEmpty()) {
            throw new CustomException(404, "USER NOT FOUND");
        }

        User u = optionalUser.get();
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(u.getUserId());
        userDTO.setUserName(u.getUserName());

        return userDTO;
    }

}
