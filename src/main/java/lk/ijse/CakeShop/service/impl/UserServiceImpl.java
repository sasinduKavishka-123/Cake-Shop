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

import java.util.ArrayList;
import java.util.List;
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
            log.error("Error in method saveUser()");
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
            log.error("Error in method findUser()");
            throw new CustomException(404, "USER NOT FOUND");
        }

        User u = optionalUser.get();
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(u.getUserId());
        userDTO.setUserName(u.getUserName());

        return userDTO;
    }

    @Override
    public List<UserDTO> getUsers(String name, String email) {
        log.info("Execute method getUsers()");

//        if(name.isEmpty() || email.isEmpty()){
//            log.error("Error in method getUsers()");
//            throw new CustomException(404, "USER ROLE NOT FOUND");
//        }

        List<User> users = userRepository.getUsers(name, email);
        List<UserDTO> userDTOS = new ArrayList<>();
        for(User u : users){
            UserDTO dto = new UserDTO();
            dto.setUserId(u.getUserId());
            dto.setUserName(u.getUserName());
            dto.setUserEmail(u.getUserEmail());
            dto.setUserRoles(u.getUserRoles());
            dto.setUserStatus(u.getUserStatus());

            userDTOS.add(dto);
        }
        return userDTOS;
    }

    @Override
    public int getUserCountByRole(String userRole) {
        log.info("Execute method getUserCountByRole()");

        if(userRole.isEmpty()){
            log.error("Error in method getUserCountByRole()");
            throw new CustomException(404, "USER ROLE NOT FOUND");
        }
        return userRepository.getUserCountByRole(userRole);
    }

}
